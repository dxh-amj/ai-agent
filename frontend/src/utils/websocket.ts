export const buildWebSocketUrl = (endpoint: string, token?: string): string => {
  if (typeof window === "undefined") return "";

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.host;
  const baseUrl = protocol + "//" + host + "/ws";

  const url = new URL(baseUrl + "/" + endpoint);
  if (token) {
    url.searchParams.append("token", token);
  }
  return url.toString();
};
