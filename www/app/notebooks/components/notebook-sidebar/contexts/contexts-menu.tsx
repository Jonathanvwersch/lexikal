"use client";

import { MessageSquareQuote, Quote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { useParams } from "next/navigation";
import { AddContext } from "./add-context";
import { useGetContexts } from "@/api/contexts";

export function ContextsMenu() {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const basePath = `/notebooks/${notebookId}/contexts`;

  const { data } = useGetContexts({
    path: { notebookId },
  });

  return (
    <MenuParentItem
      href={basePath}
      Icon={MessageSquareQuote}
      label="Contexts"
      AddComponent={<AddContext />}
    >
      {data?.contexts?.map((context) => (
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
