"use client";

import { Menu } from "@/components/notebook-sidebar/menu";

import { cn } from "@/lib/utils";
import { useNotebookSidebar } from "@/context/notebook-sidebar/use-notebook-sidebar";

import { SidebarToggle } from "./sidebar-toggle";
import { SidebarHeading } from "./sidebar-heading";

export function Sidebar() {
  const sidebar = useNotebookSidebar();

  if (!sidebar) {
    return null;
  }

  const { getOpenState, setIsHover } = sidebar;
  const isOpen = getOpenState();

  return (
    <aside
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900 z-20 h-screen transition-[width] ease-in-out duration-300 px-3 py-4 flex flex-col",
        isOpen ? "w-72" : "w-[56px]"
      )}
    >
      <SidebarHeading />
      <Menu />
      <div
        className={cn(
          "w-full flex px-3",
          isOpen ? "justify-start" : "justify-center"
        )}
      >
        <SidebarToggle />
      </div>
    </aside>
  );
}
