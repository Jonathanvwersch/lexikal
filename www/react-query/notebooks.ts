import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotebooks, postNotebook } from "../api/client/notebooks";
import { queryKeys } from "./keys";
import {
  CreateNotebookNotebooksPostData,
  CreateNotebookNotebooksPostError,
  ListNotebooksNotebooksGetError,
  NotebookPostResponse,
  NotebooksGetResponse,
} from "@/generated/types.gen";
import { MutationOptions, QueryOptions } from "./types";

export const usePostNotebook = (
  options?: MutationOptions<
    typeof postNotebook,
    CreateNotebookNotebooksPostError
  >
) => {
  return useMutation<
    NotebookPostResponse | undefined,
    CreateNotebookNotebooksPostError,
    CreateNotebookNotebooksPostData
  >({
    ...options,
    mutationFn: postNotebook,
  });
};

export const useGetNotebooks = (
  options?: QueryOptions<typeof getNotebooks, ListNotebooksNotebooksGetError>
) => {
  return useQuery<
    NotebooksGetResponse | undefined,
    ListNotebooksNotebooksGetError
  >({
    ...options,
    queryKey: [queryKeys.notebooks.get],
    queryFn: getNotebooks,
  });
};
