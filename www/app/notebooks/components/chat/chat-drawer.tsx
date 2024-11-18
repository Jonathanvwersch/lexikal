import { ChatMessages } from "./chat-messages";
import { ChatMessage } from "@/generated/types.gen";
import { cn } from "@/utils/styles";

type Props = Readonly<{
  isOpen: boolean;
  messages: ChatMessage[];
  isReceivingMessage: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}>;

export const NotebookChatDrawer = ({
  isOpen,
  messages,
  isReceivingMessage,
  bottomRef,
}: Props) => {
  return (
    <div
      className={cn(
        `
        z-0 
        overflow-auto
        absolute mx-3
        top-3 bottom-0
        left-0 right-0
        pb-16
        bg-muted/25 
        rounded-tr-[8px] rounded-tl-[8px]        
        transition-opacity duration-500 ease-in-out
      `,
        isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      <ChatMessages
        bottomRef={bottomRef}
        messages={messages}
        isReceivingMessage={isReceivingMessage}
      />
    </div>
  );
};
