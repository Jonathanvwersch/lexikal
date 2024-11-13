import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "./chat-messages";
import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export const NotebookChatDrawer = forwardRef<any, Props>(
  ({ isOpen, onClose }, ref) => {
    const messagesRef = useRef<any>();

    useImperativeHandle(ref, () => ({
      addMessage: (message: any) => {
        messagesRef.current?.addMessage(message);
      },
      setGenerating: (generating: boolean) => {
        messagesRef.current?.setGenerating(generating);
      },
    }));

    return (
      <div
        className={`
          absolute px-3 pt-8 mx-3
          bg-muted/25 rounded-tr-[8px] rounded-tl-[8px] 
          border-gray-200 border-solid border-[1px] 
          top-3 bottom-0
          transition-all duration-500 ease-in-out
          left-0 right-0
        `}
        style={{
          transform: isOpen ? "translateY(0%)" : "translateY(100%)",
        }}
      >
        <Button
          size="icon"
          className="absolute top-1 right-1"
          variant="ghost"
          onClick={onClose}
        >
          <X />
        </Button>
        <ChatMessages innerRef={messagesRef} />
      </div>
    );
  }
);

NotebookChatDrawer.displayName = "NotebookChatDrawer";
