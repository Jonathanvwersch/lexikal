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
      className="absolute px-8 pt-8 mx-2 top-2 bottom-0 right-0 left-0 pb-32 bg-muted/25 rounded-tr-[8px] rounded-tl-[8px] bg-background border-gray-200 border-solid border-[1px] transition-all duration-500 ease-in-out"
      style={{ transform: isOpen ? "translateY(0)" : "translateY(100%)" }}
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
