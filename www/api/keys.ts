export const queryKeys = {
  notebooks: {
    get: ["get-notebooks"],
    post: ["post-notebook"],
  },
  contexts: {
    get: (notebookId: string) => ["get-contexts", notebookId] as const,
    postMetadata: ["post-context-metadata"],
    uploadFile: (notebookId: string, contextId: string) =>
      ["upload-context-file", notebookId, contextId] as const,
  },
} as const;

type NestedKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends readonly [string]
        ? T[K]
        : T[K] extends (...args: any[]) => readonly any[]
        ? ReturnType<T[K]>
        : NestedKeys<T[K]>;
    }[keyof T]
  : never;

export type QueryKey = NestedKeys<typeof queryKeys>;
