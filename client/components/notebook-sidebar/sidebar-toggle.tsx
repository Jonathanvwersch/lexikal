"use client";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNotebookSidebar } from "@/context/notebook-sidebar/use-notebook-sidebar";

export function SidebarToggle() {
  const sidebar = useNotebookSidebar();

  if (!sidebar) {
    return null;
  }

  const { isOpen, toggleOpen } = sidebar;

  return (
    <div className="z-20 flex">
      <Button
        onClick={() => toggleOpen()}
        className="rounded-md w-6 h-6"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
