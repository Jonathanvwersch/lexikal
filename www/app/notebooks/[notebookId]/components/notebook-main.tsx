"use client";

import { NotebookChatInput } from "../../components/chat/chat-input";
import { NotebookChatSendButton } from "../../components/chat/chat-send-button";
import { useCallback, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ChatMessage } from "@/generated/types.gen";
import { useChatWithNotebook } from "@/react-query/chat";
import { NotebookChatDrawer } from "../../components/chat/chat-drawer";
import { cn } from "@/utils/styles";
import { useContextsContext } from "../react-context/use-contexts-context";

type NotebookLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export function NotebookMain({ children }: NotebookLayoutProps) {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { checkedContexts } = useContextsContext();

  const chatMutation = useChatWithNotebook({
    onSuccess: (data) => {
      if (!data) return;

      const assistantMessage = {
        role: "assistant",
        content: data.message,
        sources: data.sources,
      };

      setHistory((prev) => [...prev, assistantMessage]);
    },
  });

  const handleSend = useCallback(async () => {
    if (!message.trim()) {
      return;
    }

    if (!openDrawer) {
      setOpenDrawer(true);
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    setHistory((prev) => [...prev, userMessage]);
    setMessage("");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    await chatMutation.mutateAsync({
      data: {
        path: { notebook_id: notebookId },
        body: {
          message: message,
          history: history,
          context_ids: checkedContexts,
        },
      },
    });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, openDrawer, history, notebookId, chatMutation]);

  const handleDrawerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (openDrawer) {
      setOpenDrawer(false);
      setMessage("");
    } else {
      setOpenDrawer(true);
    }
  };

  return (
    <div className="w-full h-full relative p-4">
      <main
        className={cn(
          "relative overflow-auto h-full",
          openDrawer ? "-z-10" : "z-10"
        )}
      >
        {children}
      </main>
      <div className="absolute bottom-[16px] w-full left-0 right-0 px-4 max-w-[1000px] mx-auto flex flex-col gap-2 z-20">
        <NotebookChatInput
          sourcesCount={checkedContexts.length}
          isDrawerOpen={openDrawer}
          onChatDrawerClick={handleDrawerClick}
          message={message}
          setMessage={setMessage}
          SendComponent={
            <NotebookChatSendButton
              onSend={handleSend}
              disabled={checkedContexts.length === 0}
            />
          }
        />
      </div>
      <NotebookChatDrawer
        bottomRef={bottomRef}
        isOpen={openDrawer}
        messages={history}
        isReceivingMessage={chatMutation.isPending}
      />
    </div>
  );
}
