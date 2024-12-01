"use client";

import { useParams } from "next/navigation";
import { AddContext } from "./add-context";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/react-query/keys";
import { ContextsGetResponse } from "@/generated/types.gen";
import { RESOURCE_ICON_MAP } from "@/app/notebooks/constants";
import { useContextsContext } from "@/app/notebooks/[notebookId]/react-context/use-contexts-context";
import { MenuItem } from "../menu/menu-item";
import { MenuParentItem } from "../menu/menu-parent-item";
import { Checkbox } from "@/components/ui/checkbox";

export function ContextsMenu() {
  const params = useParams();
  const notebookId = params.notebookId as string;
  const basePath = `/notebooks/${notebookId}/contexts`;
  const contextData = useCacheQuery<ContextsGetResponse>(
    queryKeys.contexts.getAll(notebookId)
  );
  const { checkedContexts, setCheckedContexts } = useContextsContext();

  const handleCheck = (contextId: string) => {
    if (checkedContexts.includes(contextId)) {
      setCheckedContexts(checkedContexts.filter((id) => id !== contextId));
    } else {
      setCheckedContexts([...checkedContexts, contextId]);
    }
  };

  const handleCheckAll = () => {
    if (checkedContexts.length === contextData?.contexts?.length) {
      setCheckedContexts([]);
    } else {
      setCheckedContexts(contextData?.contexts?.map((c) => c.id) || []);
    }
  };

  return (
    <MenuParentItem
      href={basePath}
      Icon={RESOURCE_ICON_MAP.context.parent}
      label="Contexts"
      emptyMessage="No contexts found"
      AddComponent={<AddContext />}
      defaultOpen
    >
      {contextData?.contexts?.length ? (
        <>
          <div className="flex items-center gap-2 justify-between px-1.5">
            <p className="text-xs text-muted-foreground mb-2">
              Select all sources
            </p>
            <Checkbox onCheckedChange={handleCheckAll} />
          </div>
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
                onCheck={() => handleCheck(context.id)}
                checked={checkedContexts.includes(context.id)}
              />
            ))}
        </>
      ) : null}
    </MenuParentItem>
  );
}
