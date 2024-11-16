import {
  createNotebookNotebooksPost,
  listNotebooksNotebooksGet,
} from "@/generated/services.gen";
import { CreateNotebookNotebooksPostData } from "@/generated/types.gen";

import { authWrapper } from "./auth";
import { ApiParams } from "./types";

export const postNotebook = async ({
  data,
  isServer,
}: ApiParams<CreateNotebookNotebooksPostData>) => {
  const res = await authWrapper(createNotebookNotebooksPost, data, isServer);
  return res.data;
};

export const getNotebooks = async ({ isServer }: ApiParams = {}) => {
  const res = await authWrapper(listNotebooksNotebooksGet, {}, isServer);
  return res.data;
};
