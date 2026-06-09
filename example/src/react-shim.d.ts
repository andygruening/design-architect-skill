declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare namespace React {
  type FormEvent<T = unknown> = { preventDefault(): void; currentTarget: T };
  type ReactNode = any;
}

declare module "react" {
  export type CSSProperties = Record<string, string | number | undefined>;
  export type Context<T> = { Provider: any; __value?: T };
  export const StrictMode: any;
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initialValue: T): [T, (value: T | ((current: T) => T)) => void];
}

declare module "react-dom/client" {
  export function createRoot(element: HTMLElement): {
    render(children: unknown): void;
  };
}

declare module "react/jsx-runtime" {
  export const Fragment: any;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}
