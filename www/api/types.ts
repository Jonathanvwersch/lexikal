export type ApiParams<T extends Record<string, unknown> = {}> =
  | {
      data: T;
      isServer?: boolean;
    }
  | Record<string, never>;

export type ApiFunction<T = any, P extends Record<string, unknown> = {}> = (
  params: ApiParams<P>
) => Promise<T>;
