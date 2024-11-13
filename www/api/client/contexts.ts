import {
  listContextsNotebooksNotebookIdContextsGet,
  processDocumentChunksNotebooksNotebookIdContextsContextIdChunkPost,
  uploadMetadataNotebooksNotebookIdContextsMetadataPost,
} from "@/generated/services.gen";
import {
  ListContextsNotebooksNotebookIdContextsGetData,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
  ProcessDocumentChunksNotebooksNotebookIdContextsContextIdChunkPostData,
} from "@/generated/types.gen";

import { clientAuthFetch } from "./auth";

export const postContextMetadata = async (
  data: UploadMetadataNotebooksNotebookIdContextsMetadataPostData
) => {
  const res = await clientAuthFetch(
    uploadMetadataNotebooksNotebookIdContextsMetadataPost,
    data
  );
  return res.data;
};

export const getContexts = async (
  data: ListContextsNotebooksNotebookIdContextsGetData
) => {
  const res = await clientAuthFetch(
    listContextsNotebooksNotebookIdContextsGet,
    data
  );
  return res.data;
};

export const postChunkContext = async (
  data: ProcessDocumentChunksNotebooksNotebookIdContextsContextIdChunkPostData
) => {
  const res = await clientAuthFetch(
    processDocumentChunksNotebooksNotebookIdContextsContextIdChunkPost,
    data
  );
  return res.data;
};
