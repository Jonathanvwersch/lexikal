import {
  createNewNotebookNotebooksPost,
  listNotebooksNotebooksGet,
} from "@/generated/services.gen";
import { CreateNewNotebookNotebooksPostData } from "@/generated/types.gen";

import { clientAuthFetch } from "./auth";

export const postNotebook = async (
  data: CreateNewNotebookNotebooksPostData
) => {
  const res = await clientAuthFetch(createNewNotebookNotebooksPost, data);
  return res.data;
};

export const getNotebooks = async () => {
  const res = await clientAuthFetch(listNotebooksNotebooksGet, {});
  return res.data;
};
