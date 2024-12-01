import {
  getFileNotebooksNotebookIdContextsContextIdFileGet,
  getContextsNotebooksNotebookIdContextsGet,
  processDocumentChunksNotebooksNotebookIdContextsContextIdChunkPost,
  uploadMetadataNotebooksNotebookIdContextsMetadataPost,
  getContextNotebooksNotebookIdContextsContextIdGet,
} from "@/generated/services.gen";
import {
  GetContextsNotebooksNotebookIdContextsGetData,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
  ProcessDocumentChunksNotebooksNotebookIdContextsContextIdChunkPostData,
  GetFileNotebooksNotebookIdContextsContextIdFileGetData,
  GetContextNotebooksNotebookIdContextsContextIdGetData,
} from "@/generated/types.gen";

import { authWrapper } from "./auth";
import { ApiParams } from "./types";

export const postContextMetadata = async ({
  data,
  isServer,
}: ApiParams<UploadMetadataNotebooksNotebookIdContextsMetadataPostData>) => {
  const res = await authWrapper(
    uploadMetadataNotebooksNotebookIdContextsMetadataPost,
    data,
    isServer
  );
  return res.data;
};

export const getContexts = async ({
  data,
  isServer,
}: ApiParams<GetContextsNotebooksNotebookIdContextsGetData>) => {
  const res = await authWrapper(
    getContextsNotebooksNotebookIdContextsGet,
    data,
    isServer
  );
  return res.data;
};

export const getContext = async ({
  data,
  isServer,
}: ApiParams<GetContextNotebooksNotebookIdContextsContextIdGetData>) => {
  const res = await authWrapper(
    getContextNotebooksNotebookIdContextsContextIdGet,
    data,
    isServer
  );
  return res.data;
};

export const postChunkContext = async ({
  data,
  isServer,
}: ApiParams<ProcessDocumentChunksNotebooksNotebookIdContextsContextIdChunkPostData>) => {
  const res = await authWrapper(
    processDocumentChunksNotebooksNotebookIdContextsContextIdChunkPost,
    data,
    isServer
  );
  return res.data;
};

export async function getContextFile({
  data,
  isServer,
}: ApiParams<GetFileNotebooksNotebookIdContextsContextIdFileGetData>) {
  const response = await authWrapper(
    getFileNotebooksNotebookIdContextsContextIdFileGet,
    data,
    isServer
  );
  return response.data;
}
