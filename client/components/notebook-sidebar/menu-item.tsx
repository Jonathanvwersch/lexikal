"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { useNotebookSidebar } from "@/context/notebook-sidebar/use-notebook-sidebar";
import { APP_NAME } from "@/constants/app";

type Props = Readonly<{
  href: string;
  icon: React.ElementType;
  label: string;
}>;

export function MenuItem({ href, icon, label }: Props) {
  const sidebar = useNotebookSidebar();

  const isOpen = sidebar?.getOpenState();

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 py-4 px-3 h-[59px]",
        isOpen ? "" : "justify-center"
      )}
    >
      <Image src="/icons/logo.svg" alt="Lexikal" width={32} height={32} />
      <h1
        className={cn(
          `font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300`,
          !isOpen
            ? "-translate-x-96 opacity-0 hidden"
            : "translate-x-0 opacity-100"
        )}
      >
        {APP_NAME}
      </h1>
    </Link>
  );
}
