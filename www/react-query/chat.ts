import { useMutation } from "@tanstack/react-query";
import { chatWithNotebook } from "../api/chat";
import {
  ChatWithNotebookNotebooksNotebookIdChatPostData,
  ChatWithNotebookNotebooksNotebookIdChatPostError,
  ChatResponse,
} from "@/generated/types.gen";
import { MutationOptions } from "./types";
import { ApiParams } from "@/api/types";

export const useChatWithNotebook = (
  options?: MutationOptions<
    typeof chatWithNotebook,
    ChatWithNotebookNotebooksNotebookIdChatPostError
  >
) => {
  return useMutation<
    ChatResponse | undefined,
    ChatWithNotebookNotebooksNotebookIdChatPostError,
    ApiParams<ChatWithNotebookNotebooksNotebookIdChatPostData>
  >({
    mutationFn: chatWithNotebook,
    ...options,
  });
};
