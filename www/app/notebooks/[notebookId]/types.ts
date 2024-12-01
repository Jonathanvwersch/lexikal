import { ChatMessageSource } from "@/generated/types.gen";

export type NotebookParams = {
  notebookId: string;
  contextId?: string;
};

export type ContextSideSheetArgs = Readonly<{
  url: string;
  title: string;
  page?: number;
  originalText: string;
}>;

export type ChatMessage = Readonly<
  | {
      role: "user";
      content: string;
    }
  | {
      role: "assistant";
      content: string;
      sources: ChatMessageSource[];
    }
>;
