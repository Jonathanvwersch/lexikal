"use client";

import { Ellipsis, LucideIcon, Pencil, Trash } from "lucide-react";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const items: { title: "Edit" | "Delete"; icon: LucideIcon }[] = [
  { title: "Edit", icon: Pencil },
  { title: "Delete", icon: Trash },
];

type Props = Readonly<{
  href: string;
  Icon: LucideIcon;
  label: string;
  onEdit: () => void;
  onDelete: () => void;
}>;

export function MenuItem({ href, Icon, label, onEdit, onDelete }: Props) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="">
        <Link href={href}>
          <Icon className="!w-3 !h-3" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction>
            <Ellipsis />
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          className="min-w-56 rounded-lg"
        >
          {items.map((item) => (
            <DropdownMenuItem
              key={item.title}
              className="flex items-center gap-3"
              onClick={item.title === "Edit" ? onEdit : onDelete}
            >
              <item.icon className="!w-3 !h-3" />
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
