"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatMessage } from "@/generated/types.gen";
import Logo from "@/public/icons/logo.png";
import { useGetMe } from "@/react-query/users";
import { useEffect, useLayoutEffect, useRef } from "react";

type Props = Readonly<{
  messages: ChatMessage[];
  isReceivingMessage: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}>;

export function ChatMessages({
  messages,
  isReceivingMessage,
  bottomRef,
}: Props) {
  const { data: me } = useGetMe();
  const loadingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isReceivingMessage) {
      loadingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
              <ChatBubbleAvatar
                src={me?.profileImageUrl}
                fallback={me?.name?.[0]}
                className="rounded-full"
              />
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
        <ChatBubble variant="received" ref={loadingRef}>
          <ChatBubbleAvatar
            src={Logo.src}
            fallback="🤖"
            className="rounded-full"
          />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      )}
      <div className="pb-20" ref={bottomRef} />
    </ChatMessageList>
  );
}
