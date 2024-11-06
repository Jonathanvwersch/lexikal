import {
  createNotebookNotebooksPost,
  listNotebooksNotebooksGet,
} from "@/generated/services.gen";
import { CreateNotebookNotebooksPostData } from "@/generated/types.gen";

import { clientAuthFetch } from "./auth";

export const postNotebook = async (data: CreateNotebookNotebooksPostData) => {
  const res = await clientAuthFetch(createNotebookNotebooksPost, data);
  return res.data;
};

export const getNotebooks = async () => {
  const res = await clientAuthFetch(listNotebooksNotebooksGet, {});
  return res.data;
};
