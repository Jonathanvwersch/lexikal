"use client";

import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { useParams } from "next/navigation";
import { AddContext } from "./add-context";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/react-query/keys";
import { ContextsGetResponse } from "@/generated/types.gen";
import { RESOURCE_ICON_MAP } from "@/app/notebooks/constants";

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
      Icon={RESOURCE_ICON_MAP.context.parent}
      label="Contexts"
      emptyMessage="No contexts found"
      AddComponent={<AddContext />}
      defaultOpen
    >
      {contextData?.contexts
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((context) => (
          <MenuItem
            key={context.id}
            href={`${basePath}/${context.id}`}
            Icon={RESOURCE_ICON_MAP.context.child}
            label={context.name}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
    </MenuParentItem>
  );
}
