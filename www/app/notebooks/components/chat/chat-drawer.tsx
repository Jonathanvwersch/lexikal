"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessages } from "./chat-messages";

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
}>;

export function NotebookChatDrawer({ isOpen, onClose }: Props) {
  return (
    <div
      className={`
        absolute px-3 pt-8 mx-3 my-2 
        bg-muted/25 rounded-tr-[8px] rounded-tl-[8px] 
        border-gray-200 border-solid border-[1px] 
        top-0 bottom-0 h-full
        transition-all duration-500 ease-in-out
        left-0 right-0
      `}
      style={{
        transform: isOpen ? "translateY(100%)" : "translateY(0)",
      }}
    >
      <Button
        size="icon"
        className="absolute top-1 right-1"
        variant="ghost"
        onClick={onClose}
      >
        <X />
      </Button>
      <ChatMessages />
    </div>
  );
}
