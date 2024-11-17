export const queryKeys = {
  notebooks: {
    get: ["notebooks"],
  },
  contexts: {
    get: (notebookId: string) =>
      [...queryKeys.notebooks.get, notebookId, "contexts"] as const,
  },
  users: {
    getMe: ["users", "me"],
  },
} as const;

type NestedKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends readonly string[]
        ? T[K]
        : T[K] extends (...args: any[]) => readonly any[]
        ? ReturnType<T[K]>
        : NestedKeys<T[K]>;
    }[keyof T]
  : never;

export type QueryKey = NestedKeys<typeof queryKeys>;
