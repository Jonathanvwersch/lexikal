"use client";

import { NotebookCard } from "@/app/notebooks/components/notebook-card";
import { useGetNotebooks } from "@/api/notebooks";

export function Notebooks() {
  const { data } = useGetNotebooks();
  const notebooks = data?.notebooks;

  return (
    <>
      {notebooks?.map((notebook) => (
        <NotebookCard key={notebook.id} {...notebook} />
      ))}
    </>
  );
}
