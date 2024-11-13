"use client";

import { useCallback, useState, useRef } from "react";
import { NotebookChatInput } from "./chat-input";
import { NotebookChatSendButton } from "./chat-send-button";
import { NotebookChatDrawer } from "./chat-drawer";
import { useChatWithNotebook } from "@/react-query/chat";
import { useParams } from "next/navigation";
import { ChatMessage } from "@/generated/types.gen";

export function NotebookChat() {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const chatMessagesRef = useRef<any>(null);

  const chatMutation = useChatWithNotebook({
    onSuccess: (data) => {
      if (!data) return;

      const assistantMessage = {
        role: "assistant",
        content: data.message,
        sources: data.sources,
      };

      setHistory((prev) => [...prev, assistantMessage]);
      chatMessagesRef.current?.addMessage(assistantMessage);
      chatMessagesRef.current?.setGenerating(false);
    },
  });

  const handleSend = useCallback(async () => {
    if (!message.trim()) return;

    // Open drawer if closed
    if (!openDrawer) {
      setOpenDrawer(true);
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    // Add user message to history and UI
    setHistory((prev) => [...prev, userMessage]);
    chatMessagesRef.current?.addMessage(userMessage);
    chatMessagesRef.current?.setGenerating(true);

    // Clear input
    setMessage("");

    // Send to backend
    await chatMutation.mutateAsync({
      path: { notebook_id: notebookId },
      body: {
        message: message,
        history: history,
      },
    });
  }, [message, openDrawer, history, notebookId, chatMutation]);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setMessage("");
  };

  return (
    <>
      <NotebookChatDrawer
        isOpen={openDrawer}
        onClose={handleDrawerClose}
        ref={chatMessagesRef}
      />
      <div className="absolute bottom-[16px] w-full left-0 right-0 px-4 max-w-[1000px] mx-auto">
        <NotebookChatInput
          message={message}
          setMessage={setMessage}
          SendComponent={<NotebookChatSendButton onSend={handleSend} />}
        />
      </div>
    </>
  );
}
