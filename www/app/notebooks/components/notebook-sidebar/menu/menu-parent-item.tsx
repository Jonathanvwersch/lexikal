"use client";

import { ChevronRight, LucideIcon } from "lucide-react";

import { useState } from "react";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/utils/styles";
import { NotebookParams } from "@/app/notebooks/[notebookId]/types";

type Props = Readonly<{
  href: string;
  Icon: LucideIcon;
  label: string;
  children: React.JSX.Element[] | undefined;
  AddComponent: React.ReactNode;
  emptyMessage?: string;
  defaultOpen?: boolean;
}>;

export function MenuParentItem({
  href,
  Icon,
  label,
  children,
  AddComponent,
  emptyMessage,
  defaultOpen = false,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const pathname = usePathname();
  const params = useParams() as NotebookParams;
  const contextId = params.contextId;
  const isActive = pathname.includes(href) && (!contextId || !isOpen);

  return (
    <SidebarMenuItem
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Collapsible
        onOpenChange={setIsOpen}
        className={cn(
          `group/collapsible ${
            isHovering
              ? "[&[data-state=open]>button>svg:first-child]:rotate-90"
              : ""
          }`
        )}
        open={isOpen}
      >
        <SidebarMenuAction className="left-1">
          {isHovering ? (
            <CollapsibleTrigger asChild>
              <ChevronRight className="transition-transform" />
            </CollapsibleTrigger>
          ) : (
            <Icon />
          )}
        </SidebarMenuAction>
        <SidebarMenuButton
          asChild
          className={`${isActive ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Link href={href}>
            <span className="ml-6">{label}</span>
          </Link>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub className="pr-[1px] mr-0">
            {children?.length ? (
              children
            ) : (
              <span className="text-muted-foreground text-xs">
                {emptyMessage}
              </span>
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
        {AddComponent}
      </Collapsible>
    </SidebarMenuItem>
  );
}
