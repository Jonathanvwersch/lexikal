import {
  convertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPost,
  getFileNotebooksNotebookIdContextsContextIdFileGet,
  listContextsNotebooksNotebookIdContextsGet,
  processDocumentChunksNotebooksNotebookIdContextsContextIdChunkPost,
  uploadMetadataNotebooksNotebookIdContextsMetadataPost,
} from "@/generated/services.gen";
import {
  ListContextsNotebooksNotebookIdContextsGetData,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
  ProcessDocumentChunksNotebooksNotebookIdContextsContextIdChunkPostData,
  GetFileNotebooksNotebookIdContextsContextIdFileGetData,
  ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostData,
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
}: ApiParams<ListContextsNotebooksNotebookIdContextsGetData>) => {
  const res = await authWrapper(
    listContextsNotebooksNotebookIdContextsGet,
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

export async function postContextMarkdown({
  data,
  isServer,
}: ApiParams<ConvertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPostData>) {
  const response = await authWrapper(
    convertToMarkdownNotebooksNotebookIdContextsContextIdToMarkdownPost,
    data,
    isServer
  );

  return response.data;
}
