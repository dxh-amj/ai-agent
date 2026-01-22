declare module "react-hot-toast" {
  import type { ReactNode } from "react";

  export interface ToastOptions {
    duration?: number;
    position?:
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right"
      | "top-center"
      | "bottom-center";
    style?: React.CSSProperties;
    className?: string;
    icon?: ReactNode;
    id?: string;
  }

  export interface Toast {
    id: string;
    message: ReactNode;
    visible: boolean;
  }

  export function toast(message: string, options?: ToastOptions): string;
  export namespace toast {
    function success(message: string, options?: ToastOptions): string;
    function error(message: string, options?: ToastOptions): string;
    function dismiss(id?: string): void;
  }

  export function useToaster(): {
    toasts: Toast[];
  };

  export default toast;
}
