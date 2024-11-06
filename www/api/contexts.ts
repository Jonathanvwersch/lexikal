import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./types";
import { keys } from "./keys";
import {
  getContexts,
  postContextMetadata,
  uploadContextFile,
} from "./client/contexts";
import {
  UploadFileNotebooksNotebookIdContextsContextIdUploadPostData,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
} from "@/generated/types.gen";

export const usePostContextMetadata = (
  options: MutationOptions<typeof postContextMetadata> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: (
      data: UploadMetadataNotebooksNotebookIdContextsMetadataPostData
    ) => postContextMetadata(data),
    mutationKey: [keys.contexts.postMetadata],
  });
};

export const useGetContexts = (
  options?: QueryOptions<typeof getContexts> & {
    path: { notebookId: string };
  }
) => {
  return useQuery({
    ...options,
    queryKey: [keys.contexts.get, options?.path?.notebookId],
    queryFn: () =>
      getContexts({ path: { notebook_id: options!.path.notebookId } }),
  });
};

export const useUploadContextFile = (
  options: MutationOptions<typeof uploadContextFile> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: (
      data: UploadFileNotebooksNotebookIdContextsContextIdUploadPostData
    ) => uploadContextFile(data),
    mutationKey: [keys.contexts.uploadFile],
  });
};
