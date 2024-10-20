"use client";

import { MessageSquareQuote, Quote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { useParams, usePathname } from "next/navigation";
import { AddContext } from "./add-context";

const mockInitialContexts = [
  {
    id: "1",
    name: "Context 1",
    type: "url",
  },
  {
    id: "2",
    name: "Context 2",
    type: "file",
  },
  {
    id: "3",
    name: "Context 3",
    type: "text",
  },
];

export function ContextsMenu() {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const basePath = `/notebooks/${notebookId}/contexts`;

  return (
    <MenuParentItem
      href={basePath}
      Icon={MessageSquareQuote}
      label="Contexts"
      AddComponent={<AddContext />}
    >
      {mockInitialContexts.map((context) => (
        <MenuItem
          key={context.id}
          href={`${basePath}/${context.id}`}
          Icon={Quote}
          label={context.name}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </MenuParentItem>
  );
}
