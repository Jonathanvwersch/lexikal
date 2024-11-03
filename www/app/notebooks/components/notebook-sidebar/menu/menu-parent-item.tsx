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
import { cn } from "@/utils/styles";

type Props = Readonly<{
  href: string;
  Icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  AddComponent: React.ReactNode;
}>;

export function MenuParentItem({
  href,
  Icon,
  label,
  children,
  AddComponent,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <SidebarMenuItem
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Collapsible
        className={cn(
          `group/collapsible ${
            isHovering
              ? "[&[data-state=open]>button>svg:first-child]:rotate-90"
              : ""
          }`
        )}
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
        <SidebarMenuButton asChild>
          <Link href={href}>
            <span className="ml-6">{label}</span>
          </Link>
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub className="pr-[1px] mr-0">{children}</SidebarMenuSub>
        </CollapsibleContent>
        {AddComponent}
      </Collapsible>
    </SidebarMenuItem>
  );
}
