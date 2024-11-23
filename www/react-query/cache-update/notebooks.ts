import {
  NotebookPostResponse,
  NotebooksGetResponse,
} from "@/generated/types.gen";

import { queryKeys } from "../keys";
import { QueryClient } from "@tanstack/react-query";

export function updateNotebookCache(
  queryClient: QueryClient,
  notebookId: string,
  notebook: NotebooksGetResponse["notebooks"][number]
) {
  queryClient.setQueryData<NotebooksGetResponse>(
    queryKeys.notebooks.get,
    (oldData) => {
      if (!oldData) return { notebooks: [notebook] };

      return {
        notebooks: oldData.notebooks.map((existingNotebook) =>
          existingNotebook.id === notebookId ? notebook : existingNotebook
        ),
      };
    }
  );
}

export function addNotebookCache(
  queryClient: QueryClient,
  notebook: NotebookPostResponse,
  ownerId: string
) {
  queryClient.setQueryData<NotebooksGetResponse>(
    queryKeys.notebooks.get,
    (oldData) => ({
      notebooks: oldData
        ? [...oldData.notebooks, { ...notebook, ownerId }]
        : [{ ...notebook, ownerId }],
    })
  );
}
