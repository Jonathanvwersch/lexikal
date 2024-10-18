"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useNotebookSidebar } from "@/context/notebook-sidebar/use-notebook-sidebar";
import { ChevronRight, LucideIcon, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";

type Props = Readonly<{
  href: string;
  Icon: LucideIcon;
  label: string;
  onExpand?: () => void;
  onAdd?: () => void;
}>;

export function MenuParentItem({ href, Icon, label, onExpand, onAdd }: Props) {
  const sidebar = useNotebookSidebar();
  const pathname = usePathname();
  const isOpen = sidebar?.getOpenState();
  const [isHovering, setIsHovering] = useState(false);

  const handleExpand = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onExpand?.();
    },
    [onExpand]
  );

  const handleAdd = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onAdd?.();
    },
    [onAdd]
  );

  return (
    <Button
      variant="ghost"
      className="w-full flex justify-start"
      asChild
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link
        href={`${pathname}${href}`}
        className={cn(
          "flex items-center gap-2 py-[8px] px-[8px] justify-between w-full"
        )}
      >
        <div className="flex items-center gap-2">
          {isHovering ? (
            <Button
              onClick={handleExpand}
              variant="ghost"
              className="p-1 h-fit bg-transparent hover:bg-slate-200"
            >
              <ChevronRight size={16} />
            </Button>
          ) : (
            <span className="p-1 h-fit">
              <Icon size={16} />
            </span>
          )}
          <p className={cn("text-sm", isOpen ? "block" : "hidden")}>{label}</p>
        </div>
        {isHovering && (
          <Button
            onClick={handleAdd}
            variant="ghost"
            className="p-1 h-fit bg-transparent hover:bg-slate-200"
          >
            <Plus size={16} />
          </Button>
        )}
      </Link>
    </Button>
  );
}
