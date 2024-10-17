"use client";

import { Sidebar } from "@/components/notebook-sidebar/sidebar";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function NotebookSidebarLayout({ children }: Props) {
  return (
    <div className="flex">
      <Sidebar />
      <div
        className={cn(
          "min-h-[100vh] transition-[margin-left] ease-in-out duration-300 w-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}
