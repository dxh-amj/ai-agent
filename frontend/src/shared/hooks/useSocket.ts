import { useCallback, useRef, useState } from "react";

import { toCamelCase } from "@/utils";

import type {
  OutgoingWebSocketMessage,
  UseSocketReturn,
  WebSocketConfig,
  WebSocketMessage,
} from "@/types/websocket";

export const useSocket = (config: WebSocketConfig): UseSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const DEFAULT_MAX_RECONNECT_ATTEMPTS = 3;
  const DEFAULT_RECONNECT_INTERVAL_MS = 3000;
  const maxReconnectAttempts = config.reconnectAttempts || DEFAULT_MAX_RECONNECT_ATTEMPTS;
  const reconnectInterval = config.reconnectInterval || DEFAULT_RECONNECT_INTERVAL_MS;

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    // Don't attempt connection if we've exceeded max attempts
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      setError("Max reconnection attempts reached");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const ws = new WebSocket(config.url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        reconnectAttemptsRef.current = 0;
        config.onOpen?.();
      };

      ws.onmessage = (event) => {
        try {
          const rawMessage = JSON.parse(event.data);
          const message: WebSocketMessage = {
            data: toCamelCase(rawMessage.data),
          };
          config.onMessage?.(message);
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };

      ws.onclose = (event: CloseEvent) => {
        setIsConnected(false);
        setIsConnecting(false);
        config.onClose?.();

        // Only attempt reconnection if not a clean close and under max attempts
        if (!event.wasClean && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setError("Max reconnection attempts reached");
        }
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("WebSocket connection error");
        setIsConnecting(false);
        config.onError?.(event);
      };
    } catch (err) {
      console.error("Failed to create WebSocket connection:", err);
      setError("Failed to create WebSocket connection");
      setIsConnecting(false);
    }
  }, [config, maxReconnectAttempts, reconnectInterval]);

  const disconnect = useCallback(() => {
    cleanup();
    setIsConnected(false);
    setIsConnecting(false);
    setError(null);
    reconnectAttemptsRef.current = 0;
  }, [cleanup]);

  const sendMessage = useCallback((message: OutgoingWebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket not connected, cannot send message");
    }
  }, []);

  return {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendMessage,
  };
};
