import { chatWithNotebookNotebooksNotebookIdChatPost } from "@/generated/services.gen";
import { ChatWithNotebookNotebooksNotebookIdChatPostData } from "@/generated/types.gen";
import { authWrapper } from "./auth";
import { ApiParams } from "./types";

export const chatWithNotebook = async ({
  data,
  isServer,
}: ApiParams<ChatWithNotebookNotebooksNotebookIdChatPostData>) => {
  const res = await authWrapper(
    chatWithNotebookNotebooksNotebookIdChatPost,
    data,
    isServer
  );
  return res.data;
};
