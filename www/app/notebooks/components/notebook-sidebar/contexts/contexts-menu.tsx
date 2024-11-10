"use client";

import { MessageSquareQuote, Quote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { useParams } from "next/navigation";
import { AddContext } from "./add-context";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/api/keys";
import { ContextsGetResponse } from "@/generated/types.gen";

export function ContextsMenu() {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const basePath = `/notebooks/${notebookId}/contexts`;
  const contextData = useCacheQuery<ContextsGetResponse>({
    queryKey: queryKeys.contexts.get(notebookId),
  });

  return (
    <MenuParentItem
      href={basePath}
      Icon={MessageSquareQuote}
      label="Contexts"
      emptyMessage="No contexts found"
      AddComponent={<AddContext />}
      defaultOpen
    >
      {contextData?.contexts?.map((context) => (
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
