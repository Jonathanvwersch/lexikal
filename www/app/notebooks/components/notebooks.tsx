"use client";

import { NotebookCard } from "@/app/notebooks/components/notebook-card";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/react-query/keys";
import { NotebooksGetResponse } from "@/generated";

export function Notebooks() {
  const data = useCacheQuery<NotebooksGetResponse | undefined>({
    queryKey: queryKeys.notebooks.get,
  });
  const notebooks = data?.notebooks;

  return (
    <>
      {notebooks?.map((notebook) => (
        <NotebookCard key={notebook.id} {...notebook} />
      ))}
    </>
  );
}
