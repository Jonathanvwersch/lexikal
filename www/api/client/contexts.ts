import {
  listContextsNotebooksNotebookIdContextsGet,
  uploadFileNotebooksNotebookIdContextsContextIdUploadPost,
  uploadMetadataNotebooksNotebookIdContextsMetadataPost,
} from "@/generated/services.gen";
import {
  BodyUploadFileNotebooksNotebookIdContextsContextIdUploadPost,
  ListContextsNotebooksNotebookIdContextsGetData,
  UploadFileNotebooksNotebookIdContextsContextIdUploadPostData,
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

export const uploadContextFile = async (
  data: UploadFileNotebooksNotebookIdContextsContextIdUploadPostData
) => {
  const res = await clientAuthFetch(
    uploadFileNotebooksNotebookIdContextsContextIdUploadPost,
    data
  );
  return res.data;
};
