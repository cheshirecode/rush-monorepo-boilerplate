import type { FC, PropsWithChildren } from 'react';
import type { AttributifyAttributes } from 'unocss/dist/preset-attributify';

export {};

declare module 'react' {
  type HTMLAttributes<_T> = AttributifyAttributes;
}
declare global {
  interface BaseProps extends PropsWithChildren<unknown> {
    className?: string;
    ['data-testid']?: string;
  }

  type BaseFC = FC<BaseProps>;

  export interface ErrorHttp extends Error {
    response?: unknown;
    info?: string;
    status?: number;
  }

  export type FetchResponse<R, E> = [R | undefined, Promise<E> | undefined];
}

declare module '@fieryeagle/eslint-config-react';
