import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { getContexts, postContextMetadata } from "../api/client/contexts";
import {
  ContextMetadataPostResponse,
  ContextsGetResponse,
  ListContextsNotebooksNotebookIdContextsGetError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
} from "@/generated/types.gen";
import { MutationOptions } from "./types";

export const usePostContextMetadata = (
  options?: MutationOptions<
    typeof postContextMetadata,
    UploadMetadataNotebooksNotebookIdContextsMetadataPostError
  >
) => {
  return useMutation<
    ContextMetadataPostResponse | undefined,
    UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
    UploadMetadataNotebooksNotebookIdContextsMetadataPostData
  >({
    ...options,
    mutationFn: postContextMetadata,
  });
};

export const useGetContexts = (
  params: { notebookId: string },
  options?: QueryOptions<
    ContextsGetResponse | undefined,
    ListContextsNotebooksNotebookIdContextsGetError
  >
) => {
  return useQuery<
    ContextsGetResponse | undefined,
    ListContextsNotebooksNotebookIdContextsGetError
  >({
    ...options,
    queryKey: queryKeys.contexts.get(params.notebookId),
    queryFn: () => getContexts({ path: { notebook_id: params.notebookId } }),
  });
};
