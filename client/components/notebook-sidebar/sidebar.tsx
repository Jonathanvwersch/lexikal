"use client";
import { Menu } from "@/components/notebook-sidebar/menu";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useNotebookSidebar } from "@/context/notebook-sidebar/use-notebook-sidebar";
import { APP_NAME } from "@/constants/app";

import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export function Sidebar() {
  const sidebar = useNotebookSidebar();

  if (!sidebar) {
    return null;
  }

  const { getOpenState, setIsHover, settings } = sidebar;
  const isOpen = getOpenState();

  return (
    <aside
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        "bg-zinc-50 dark:bg-zinc-900 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !isOpen ? "w-[60px]" : "w-72",
        settings.disabled && "hidden"
      )}
    >
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2 py-4 px-3",
          isOpen ? "" : "justify-center"
        )}
      >
        <Image src="/icons/logo.svg" alt="Lexikal" width={32} height={32} />
        <h1
          className={cn(
            `${lato.className} font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300`,
            !isOpen
              ? "-translate-x-96 opacity-0 hidden"
              : "translate-x-0 opacity-100"
          )}
        >
          {APP_NAME}
        </h1>
      </Link>

      <Menu isOpen={isOpen} />
    </aside>
  );
}
