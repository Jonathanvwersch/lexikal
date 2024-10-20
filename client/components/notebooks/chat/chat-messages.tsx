import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useRef, useState } from "react";
import Logo from "@/public/icons/logo.png";

interface Message {
  role: string;
  content: string;
}

export function ChatMessages() {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ChatMessageList className="bg-muted/25 rounded-[8px]" ref={messagesRef}>
      {/* Initial message */}
      <ChatBubble variant="received">
        <ChatBubbleAvatar
          src={Logo.src}
          fallback="🤖"
          className="rounded-full"
        />
        <ChatBubbleMessage>
          Hey, I'm Lex. How can I help you today?
        </ChatBubbleMessage>
      </ChatBubble>

      {/* Messages */}
      {messages &&
        messages.map((message, index) => (
          <ChatBubble
            key={index}
            variant={message.role == "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              src=""
              fallback={message.role == "user" ? "👨🏽" : "🤖"}
            />
            <ChatBubbleMessage
              variant={message.role == "user" ? "sent" : "received"}
            >
              {message.content
                .split("```")
                .map((part: string, index: number) => {
                  return <p key={index}>{part}</p>;
                })}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}

      {/* Loading */}
      {isGenerating && (
        <ChatBubble variant="received">
          <ChatBubbleAvatar src="" fallback="🤖" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      )}
    </ChatMessageList>
  );
}
