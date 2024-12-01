"use client";

import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/react-query/keys";
import { ContextsGetResponse } from "@/generated";
import { ContextCard } from "./context-card";

type Props = Readonly<{
  notebookId: string;
}>;

export function Contexts({ notebookId }: Props) {
  const data = useCacheQuery<ContextsGetResponse | undefined>(
    queryKeys.contexts.getAll(notebookId)
  );
  const contexts = data?.contexts;

  return (
    <>
      {contexts?.map((context) => (
        <ContextCard key={context.id} {...context} />
      ))}
    </>
  );
}
