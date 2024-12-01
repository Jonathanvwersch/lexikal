import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./keys";
import { getContexts, getContext, postContextMetadata } from "../api/contexts";
import {
  ContextMetadataPostResponse,
  ContextsGetResponse,
  GetContextsNotebooksNotebookIdContextsGetError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostError,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
} from "@/generated/types.gen";
import { MutationOptions, QueryOptions } from "./types";
import { ApiParams } from "@/api/types";

/* POST CONTEXT METADATA */

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

/* GET CONTEXTS */

export const getContextsQueryKeyAndFn = (params: { notebookId: string }) => {
  return {
    queryKey: queryKeys.contexts.getAll(params.notebookId),
    queryFn: () =>
      getContexts({ data: { path: { notebook_id: params.notebookId } } }),
  };
};

export const useGetContexts = (
  params: { notebookId: string },
  options?: QueryOptions<
    typeof getContexts,
    GetContextsNotebooksNotebookIdContextsGetError
  >
) => {
  return useQuery<
    ContextsGetResponse | undefined,
    GetContextsNotebooksNotebookIdContextsGetError
  >({
    ...options,
    ...getContextsQueryKeyAndFn(params),
  });
};

/* GET CONTEXT */

export const getContextQueryKeyAndFn = (params: {
  notebookId: string;
  contextId: string;
}) => {
  return {
    queryKey: queryKeys.contexts.get(params.notebookId, params.contextId),
    queryFn: () =>
      getContext({
        data: {
          path: {
            notebook_id: params.notebookId,
            context_id: params.contextId,
          },
        },
      }),
  };
};

export const useGetContext = (
  params: { notebookId: string },
  options?: QueryOptions<
    typeof getContexts,
    GetContextsNotebooksNotebookIdContextsGetError
  >
) => {
  return useQuery<
    ContextsGetResponse | undefined,
    GetContextsNotebooksNotebookIdContextsGetError
  >({
    ...options,
    ...getContextsQueryKeyAndFn(params),
  });
};
