"use client";

import { queryKeys } from "@/react-query/keys";
import { Breadcrumbs } from "@/components/header/breadcrumbs";
import {
  ContextsGetResponse,
  NotebooksGetResponse,
} from "@/generated/types.gen";
import { useCacheQuery } from "@/hooks/use-cache-query";

type Props = Readonly<{
  notebookId: string;
  contextId?: string;
}>;

export function NotebookBreadcrumbs({ notebookId, contextId }: Props) {
  const contextData = useCacheQuery<ContextsGetResponse>(
    queryKeys.contexts.get(notebookId)
  );
  const notebookData = useCacheQuery<NotebooksGetResponse>(
    queryKeys.notebooks.get
  );

  const notebook = notebookData?.notebooks.find(
    (notebook) => notebook.id === notebookId
  );
  const context = contextData?.contexts.find(
    (context) => context.id === contextId
  );

  const pathToSwap = {
    [notebookId]: notebook?.name,
    ...(contextId ? { [contextId]: context?.name } : {}),
  };

  return <Breadcrumbs pathToSwap={pathToSwap} />;
}
