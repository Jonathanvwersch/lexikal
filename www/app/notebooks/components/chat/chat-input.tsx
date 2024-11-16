import { ChatInput } from "@/components/ui/chat/chat-input";

type Props = Readonly<{
  SendComponent: React.ReactNode;
  message: string;
  setMessage: (message: string) => void;
}>;

export function NotebookChatInput({
  SendComponent,
  message,
  setMessage,
}: Props) {
  return (
    <form className="relative mx-4 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
      <div className="flex items-center gap-2">
        <ChatInput
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {SendComponent}
      </div>
    </form>
  );
}
