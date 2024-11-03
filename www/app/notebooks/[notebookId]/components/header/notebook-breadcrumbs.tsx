"use client";

import { useGetNotebooks } from "@/api/notebooks";
import { Breadcrumbs } from "@/components/header/breadcrumbs";

type Props = Readonly<{
  notebookId: string;
}>;

export function NotebookBreadcrumbs({ notebookId }: Props) {
  const { data } = useGetNotebooks();
  const notebook = data?.notebooks.find(
    (notebook) => notebook.id === notebookId
  );

  return <Breadcrumbs trailingPath={notebook?.name ?? ""} />;
}
