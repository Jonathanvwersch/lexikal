import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import {
  getContexts,
  postContextMetadata,
  uploadContextFile,
} from "./client/contexts";
import {
  ContextMetadataPostResponse,
  ContextsGetResponse,
  ListContextsNotebooksNotebookIdContextsGetError,
  UploadFileNotebooksNotebookIdContextsContextIdUploadPostData,
  UploadFileNotebooksNotebookIdContextsContextIdUploadPostError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
  ContextFileUploadPostResponse,
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
    mutationKey: [queryKeys.contexts.postMetadata],
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
    queryKey: [queryKeys.contexts.get, params.notebookId],
    queryFn: () => getContexts({ path: { notebook_id: params.notebookId } }),
  });
};

export const useUploadContextFile = (
  options?: MutationOptions<
    typeof uploadContextFile,
    UploadFileNotebooksNotebookIdContextsContextIdUploadPostError
  > & {
    path?: { contextId: string; notebookId: string };
  }
) => {
  return useMutation<
    ContextFileUploadPostResponse | undefined,
    UploadFileNotebooksNotebookIdContextsContextIdUploadPostError,
    UploadFileNotebooksNotebookIdContextsContextIdUploadPostData
  >({
    ...options,
    mutationFn: (
      data: UploadFileNotebooksNotebookIdContextsContextIdUploadPostData
    ) =>
      uploadContextFile({
        ...data,
        path: {
          context_id: options?.path?.contextId ?? data.path.context_id,
          notebook_id: options?.path?.notebookId ?? data.path.notebook_id,
        },
      }),
    mutationKey: [queryKeys.contexts.uploadFile],
  });
};
