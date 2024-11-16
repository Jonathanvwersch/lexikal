"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatMessage } from "@/generated/types.gen";
import Logo from "@/public/icons/logo.png";

type Props = Readonly<{
  messages: ChatMessage[];
  isReceivingMessage: boolean;
}>;

export function ChatMessages({ messages, isReceivingMessage }: Props) {
  return (
    <ChatMessageList className="rounded-[8px]">
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
            {message.role === "user" ? (
              <ChatBubbleAvatar src="" fallback="👨🏽" />
            ) : (
              <ChatBubbleAvatar
                src={Logo.src}
                fallback="🤖"
                className="rounded-full"
              />
            )}
            <ChatBubbleMessage
              variant={message.role === "user" ? "sent" : "received"}
            >
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
        ))}

      {/* Loading */}
      {isReceivingMessage && (
        <ChatBubble variant="received">
          <ChatBubbleAvatar src="" fallback="🤖" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      )}
    </ChatMessageList>
  );
}
