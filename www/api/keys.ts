export const keys = {
  notebooks: {
    get: "get-notebooks",
    post: "post-notebook",
  },
} as const;

type NestedKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends string ? T[K] : NestedKeys<T[K]>;
    }[keyof T]
  : never;

export type QueryKey = NestedKeys<typeof keys>;
