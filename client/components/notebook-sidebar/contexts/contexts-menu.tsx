"use client";

import { MessageSquareQuote, Quote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { usePathname } from "next/navigation";
import { AddContext } from "./add-context";

const mockInitialContexts = [
  {
    id: "1",
    name: "Source 1",
    type: "url",
  },
  {
    id: "2",
    name: "Source 2",
    type: "file",
  },
  {
    id: "3",
    name: "Source 3",
    type: "text",
  },
];

export function ContextsMenu() {
  const pathname = usePathname();

  return (
    <MenuParentItem
      href={`${pathname}/contexts`}
      Icon={MessageSquareQuote}
      label="Contexts"
      AddComponent={<AddContext />}
    >
      {mockInitialContexts.map((context) => (
        <MenuItem
          key={context.id}
          href={`${pathname}/contexts/${context.id}`}
          Icon={Quote}
          label={context.name}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </MenuParentItem>
  );
}
