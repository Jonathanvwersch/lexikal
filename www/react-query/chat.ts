import { useMutation } from "@tanstack/react-query";
import { chatWithNotebook } from "../api/client/chat";
import {
  ChatWithNotebookNotebooksNotebookIdChatPostData,
  ChatWithNotebookNotebooksNotebookIdChatPostError,
  ChatResponse,
} from "@/generated/types.gen";
import { MutationOptions } from "./types";

export const useChatWithNotebook = (
  options?: MutationOptions<
    typeof chatWithNotebook,
    ChatWithNotebookNotebooksNotebookIdChatPostError
  >
) => {
  return useMutation<
    ChatResponse | undefined,
    ChatWithNotebookNotebooksNotebookIdChatPostError,
    ChatWithNotebookNotebooksNotebookIdChatPostData
  >({
    ...options,
    mutationFn: chatWithNotebook,
  });
};
