"use client";

import { useGetContexts } from "@/api/contexts";
import { useGetNotebooks } from "@/api/notebooks";
import { Breadcrumbs } from "@/components/header/breadcrumbs";

type Props = Readonly<{
  notebookId: string;
  contextId?: string;
}>;

export function NotebookBreadcrumbs({ notebookId, contextId }: Props) {
  const { data } = useGetNotebooks();
  const { data: contextData } = useGetContexts({ path: { notebookId } });
  const notebook = data?.notebooks.find(
    (notebook) => notebook.id === notebookId
  );
  const context = contextData?.contexts.find(
    (context) => context.id === contextId
  );
  console.log("contextId", contextId);
  console.log("context", context);
  console.log("notebook", notebook);

  const pathToSwap = {
    [notebookId]: notebook?.name,
    ...(contextId ? { [contextId]: context?.name } : {}),
  };

  return <Breadcrumbs pathToSwap={pathToSwap} />;
}
