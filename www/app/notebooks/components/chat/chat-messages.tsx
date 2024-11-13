"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { RefObject, useRef, useState } from "react";
import Logo from "@/public/icons/logo.png";
import { ChatMessage } from "@/generated/types.gen";

interface Message extends ChatMessage {
  sources?: Array<{
    context_id: string;
    content: string;
  }>;
}

export function ChatMessages({
  innerRef,
}: {
  innerRef: RefObject<HTMLDivElement>;
}) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Expose these methods to parent components
  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    // Scroll to bottom after message is added
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }, 100);
  };

  const setGenerating = (generating: boolean) => {
    setIsGenerating(generating);
  };

  return (
    <ChatMessageList className="rounded-[8px]" ref={innerRef}>
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
            variant={message.role === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              src=""
              fallback={message.role === "user" ? "👨🏽" : "🤖"}
            />
            <ChatBubbleMessage
              variant={message.role === "user" ? "sent" : "received"}
            >
              {message.content}
              {message.sources && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <p className="font-semibold">Sources:</p>
                  {message.sources.map((source, idx) => (
                    <p key={idx} className="mt-1">
                      {source.content}
                    </p>
                  ))}
                </div>
              )}
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
