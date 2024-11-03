"use client";

import { useCallback, useState } from "react";
import { NotebookChatInput } from "./chat-input";
import { NotebookChatSendButton } from "./chat-send-button";
import { NotebookChatDrawer } from "./chat-drawer";

export function NotebookChat() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  return (
    <>
      <NotebookChatDrawer isOpen={openDrawer} onClose={handleDrawer} />
      <div className="absolute bottom-[16px] w-full left-0 right-0 px-4 max-w-[1000px] mx-auto">
        <NotebookChatInput
          SendComponent={<NotebookChatSendButton onSend={handleDrawer} />}
        />
      </div>
    </>
  );
}
