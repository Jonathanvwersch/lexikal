import { chatWithNotebookNotebooksNotebookIdChatPost } from "@/generated/services.gen";
import { ChatWithNotebookNotebooksNotebookIdChatPostData } from "@/generated/types.gen";
import { clientAuthFetch } from "./auth";

export const chatWithNotebook = async (
  data: ChatWithNotebookNotebooksNotebookIdChatPostData
) => {
  const res = await clientAuthFetch(
    chatWithNotebookNotebooksNotebookIdChatPost,
    data
  );
  return res.data;
};
