import { ChatMessages } from "./chat-messages";
import { cn } from "@/utils/styles";
import { ChatMessage, ContextSideSheetArgs } from "../../[notebookId]/types";
import { ContextGetResponse } from "@/generated/types.gen";

type Props = Readonly<{
  isOpen: boolean;
  messages: ChatMessage[];
  isReceivingMessage: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
  onCitationClick: (args: ContextSideSheetArgs) => void;
  contexts: ContextGetResponse[];
}>;

export const NotebookChatDrawer = ({
  isOpen,
  messages,
  isReceivingMessage,
  bottomRef,
  onCitationClick,
  contexts,
}: Props) => {
  return (
    <div
      className={cn(
        `        
        overflow-auto
        absolute mx-3
        top-3 bottom-0
        left-0 right-0
        pb-16
        bg-muted/25 
        rounded-tr-[8px] rounded-tl-[8px]        
        transition-opacity duration-500 ease-in-out
      `,
        isOpen ? "z-10" : "z-0",
        isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      <ChatMessages
        bottomRef={bottomRef}
        messages={messages}
        isReceivingMessage={isReceivingMessage}
        onCitationClick={onCitationClick}
        contexts={contexts}
      />
    </div>
  );
};
