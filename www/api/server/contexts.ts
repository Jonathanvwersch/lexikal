import { listContextsNotebooksNotebookIdContextsGet } from "@/generated/services.gen";
import { ListContextsNotebooksNotebookIdContextsGetData } from "@/generated/types.gen";
import { serverAuthFetch } from "./auth";

export const getContexts = async (
  data: ListContextsNotebooksNotebookIdContextsGetData
) => {
  const res = await serverAuthFetch(
    listContextsNotebooksNotebookIdContextsGet,
    data
  );
  return res.data;
};
