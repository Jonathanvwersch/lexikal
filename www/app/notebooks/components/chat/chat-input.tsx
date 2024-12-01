import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { MessageCircleMore, MessageCircle, X } from "lucide-react";

type Props = Readonly<{
  SendComponent: React.ReactNode;
  message: string;
  setMessage: (message: string) => void;
  onChatDrawerClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDrawerOpen: boolean;
  sourcesCount: number;
}>;

export function NotebookChatInput({
  isDrawerOpen,
  SendComponent,
  message,
  setMessage,
  onChatDrawerClick,
  sourcesCount,
}: Props) {
  return (
    <form className="relative py-2 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
      <div className="flex items-center gap-2">
        <ChatInput
          disabled={sourcesCount === 0}
          placeholder={`${
            sourcesCount === 0
              ? "Add contexts to start chatting"
              : "Type your message here..."
          }`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="text-xs text-muted-foreground border border-muted rounded-md px-1.5 flex items-center h-10 whitespace-nowrap">
          {sourcesCount} {sourcesCount === 1 ? "context" : "contexts"}
        </div>
        <Button
          size="icon"
          tooltip="Close chat drawer"
          variant="outline"
          className="ml-auto gap-1.5"
          onClick={onChatDrawerClick}
        >
          {isDrawerOpen ? <MessageCircle /> : <MessageCircleMore />}
        </Button>
        {SendComponent}
      </div>
    </form>
  );
}
