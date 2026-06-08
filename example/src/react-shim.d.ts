declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare module "react" {
  export type CSSProperties = Record<string, string | number | undefined>;
  export const StrictMode: any;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initialValue: T): [T, (value: T) => void];
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
