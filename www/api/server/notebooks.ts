import { listNotebooksNotebooksGet } from "@/generated/services.gen";

import { serverAuthFetch } from "./auth";

export const getNotebooks = async () => {
  const res = await serverAuthFetch(listNotebooksNotebooksGet, {});
  return res.data;
};
