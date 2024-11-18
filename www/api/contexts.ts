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

interface UpdateContextParams {
  notebookId: string;
  contextId: string;
  data: {
    send: boolean;
  };
}

export async function updateContext({
  notebookId,
  contextId,
  data,
}: UpdateContextParams) {
  const response = await fetch(
    `/api/notebooks/${notebookId}/contexts/${contextId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update context");
  }

  return response.json();
}
