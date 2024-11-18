import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { MessageCircleMore, MessageCircle, X } from "lucide-react";

type Props = Readonly<{
  SendComponent: React.ReactNode;
  message: string;
  setMessage: (message: string) => void;
  onClose: () => void;
  isDrawerOpen: boolean;
  sourcesCount: number;
}>;

export function NotebookChatInput({
  isDrawerOpen,
  SendComponent,
  message,
  setMessage,
  onClose,
  sourcesCount,
}: Props) {
  return (
    <form className="relative mx-4 py-2 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
      <div className="flex items-center gap-2">
        <ChatInput
          disabled={sourcesCount === 0}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="text-xs text-muted-foreground border border-muted rounded-md px-1.5 flex items-center h-10 whitespace-nowrap">
          {sourcesCount} {sourcesCount === 1 ? "source" : "sources"}
        </div>
        <Button
          size="icon"
          tooltip="Close chat drawer"
          disabled={!isDrawerOpen || sourcesCount === 0}
          variant="outline"
          className="ml-auto gap-1.5"
          onClick={onClose}
        >
          {isDrawerOpen ? <MessageCircle /> : <MessageCircleMore />}
        </Button>
        {SendComponent}
      </div>
    </form>
  );
}
