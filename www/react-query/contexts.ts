import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import {
  getContextFile,
  getContexts,
  postContextMarkdown,
  postContextMetadata,
} from "../api/contexts";
import {
  ContextMetadataPostResponse,
  ContextsGetResponse,
  ListContextsNotebooksNotebookIdContextsGetError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
  ContextFileGetResponse,
  ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostError,
  ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostData,
  FileMarkdownResponse,
} from "@/generated/types.gen";
import { MutationOptions } from "./types";
import { ApiParams } from "@/api/types";

export const usePostContextMetadata = (
  options?: MutationOptions<
    typeof postContextMetadata,
    UploadMetadataNotebooksNotebookIdContextsMetadataPostError
  >
) => {
  return useMutation<
    ContextMetadataPostResponse | undefined,
    UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
    ApiParams<UploadMetadataNotebooksNotebookIdContextsMetadataPostData>
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
    queryFn: () =>
      getContexts({
        data: { path: { notebook_id: params.notebookId } },
      }),
  });
};

export const useGetContextFile = (
  params: { notebookId: string; contextId: string },
  options?: QueryOptions<ContextFileGetResponse | undefined>
) => {
  return useQuery<ContextFileGetResponse | undefined>({
    ...options,
    queryKey: queryKeys.contexts.getFile(params.notebookId, params.contextId),
    queryFn: () =>
      getContextFile({
        data: {
          path: {
            notebook_id: params.notebookId,
            context_id: params.contextId,
          },
        },
      }),
  });
};

export const usePostContextMarkdown = (
  options?: MutationOptions<
    typeof postContextMarkdown,
    ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostError
  >
) => {
  return useMutation<
    FileMarkdownResponse | undefined,
    ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostError,
    ApiParams<ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostData>
  >({
    ...options,
    mutationFn: postContextMarkdown,
  });
};
