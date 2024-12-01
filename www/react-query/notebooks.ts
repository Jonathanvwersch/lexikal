import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotebooks, postNotebook } from "../api/notebooks";
import { queryKeys } from "./keys";
import {
  CreateNotebookNotebooksPostData,
  CreateNotebookNotebooksPostError,
  ListNotebooksNotebooksGetError,
  NotebookPostResponse,
  NotebooksGetResponse,
} from "@/generated/types.gen";
import { MutationOptions, QueryOptions } from "./types";
import { ApiParams } from "@/api/types";

export const usePostNotebook = (
  options?: MutationOptions<
    typeof postNotebook,
    CreateNotebookNotebooksPostError
  >
) => {
  return useMutation<
    NotebookPostResponse | undefined,
    CreateNotebookNotebooksPostError,
    ApiParams<CreateNotebookNotebooksPostData>
  >({
    ...options,
    mutationFn: postNotebook,
  });
};

/* GET NOTEBOOKS */

export const getNotebooksQueryKeyAndFn = () => {
  return {
    queryKey: queryKeys.notebooks.get,
    queryFn: () => getNotebooks(),
  };
};

export const useGetNotebooks = (
  options?: QueryOptions<typeof getNotebooks, ListNotebooksNotebooksGetError>
) => {
  return useQuery<
    NotebooksGetResponse | undefined,
    ListNotebooksNotebooksGetError
  >({
    ...options,
    ...getNotebooksQueryKeyAndFn(),
  });
};
