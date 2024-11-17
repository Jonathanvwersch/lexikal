import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { X } from "lucide-react";
type Props = Readonly<{
  SendComponent: React.ReactNode;
  message: string;
  setMessage: (message: string) => void;
  onClose: () => void;
  isDrawerOpen: boolean;
}>;

export function NotebookChatInput({
  isDrawerOpen,
  SendComponent,
  message,
  setMessage,
  onClose,
}: Props) {
  return (
    <form className="relative mx-4 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
      <div className="flex items-center gap-2">
        <ChatInput
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size="icon"
          tooltip="Close chat drawer"
          disabled={!isDrawerOpen}
          variant="outline"
          className="ml-auto gap-1.5"
          onClick={onClose}
        >
          <X className="size-3.5" />
        </Button>
        {SendComponent}
      </div>
    </form>
  );
}
