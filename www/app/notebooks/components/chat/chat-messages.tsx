"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ContextGetResponse,
  GetUserUsersMeGetResponse,
} from "@/generated/types.gen";
import { useCacheQuery } from "@/hooks/use-cache-query";
import Logo from "@/public/icons/logo.png";
import { queryKeys } from "@/react-query/keys";
import { useLayoutEffect, useRef } from "react";
import { formatMessageWithCitations } from "./utils/format-message-with-citations";
import { ChatMessage, ContextSideSheetArgs } from "../../[notebookId]/types";

type Props = Readonly<{
  messages: ChatMessage[];
  isReceivingMessage: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
  onCitationClick: (args: ContextSideSheetArgs) => void;
  contexts: ContextGetResponse[];
}>;

export function ChatMessages({
  messages,
  isReceivingMessage,
  bottomRef,
  onCitationClick,
  contexts,
}: Props) {
  const me = useCacheQuery<GetUserUsersMeGetResponse>(queryKeys.users.getMe);
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
              {message.role === "user"
                ? message.content
                : formatMessageWithCitations(
                    message.content,
                    message.sources,
                    contexts,
                    onCitationClick
                  )}
              {/* {isReceivingMessage && message.role === "=" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Analyzing selected contexts...</span>
                </div>
              )} */}
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
