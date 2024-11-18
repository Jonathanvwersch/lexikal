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
} from "../../../../../components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const items: { title: "Edit" | "Delete"; icon: LucideIcon }[] = [
  { title: "Edit", icon: Pencil },
  { title: "Delete", icon: Trash },
];

type Props = Readonly<{
  href: string;
  Icon: LucideIcon;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCheck?: () => void;
  checked?: boolean;
}>;

export function MenuItem({
  href,
  Icon,
  label,
  onEdit,
  onDelete,
  onCheck,
  checked,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={`${isActive ? "bg-accent text-accent-foreground" : ""}`}
      >
        <Link href={href}>
          <Icon className="!w-3 !h-3" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
      {onCheck && (
        <SidebarMenuAction asChild>
          <Checkbox
            checked={checked}
            onClick={onCheck}
            className="h-4 w-4 rounded-[4px] mr-[2px] mt-[2px]"
          />
        </SidebarMenuAction>
      )}

      {/* <DropdownMenu>
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
      </DropdownMenu> */}
    </SidebarMenuItem>
  );
}
