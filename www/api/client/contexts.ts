import {
  chunkContextNotebooksNotebookIdContextsContextIdChunkPost,
  listContextsNotebooksNotebookIdContextsGet,
  uploadMetadataNotebooksNotebookIdContextsMetadataPost,
} from "@/generated/services.gen";
import {
  ChunkContextNotebooksNotebookIdContextsContextIdChunkPostData,
  ListContextsNotebooksNotebookIdContextsGetData,
  UploadMetadataNotebooksNotebookIdContextsMetadataPostData,
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
  data: ChunkContextNotebooksNotebookIdContextsContextIdChunkPostData
) => {
  const res = await clientAuthFetch(
    chunkContextNotebooksNotebookIdContextsContextIdChunkPost,
    data
  );
  return res.data;
};
