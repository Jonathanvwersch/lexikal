"use client";

import { NotebookCard } from "@/components/notebooks/notebook-card";
import { CreateNotebook } from "./create-notebook";
import { Notebook } from "@/types/notebook";

const notebooks: Notebook[] = [
  {
    id: "1",
    name: "Untitled notebook",
    lastEdited: new Date().toISOString(),
    description:
      "This is a very long long long long long long long long long long long long long long long description of the notebook",
  },
  {
    id: "2",
    name: "CS Textbooks",
    lastEdited: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Very very very long notebook name",
    lastEdited: new Date().toISOString(),
    description: "This is a description of the notebook",
  },
  {
    id: "4",
    name: "CS Textbooks",
    lastEdited: new Date().toISOString(),
    description: "This is a description of the notebook",
  },
  {
    id: "5",
    name: "Untitled notebook",
    lastEdited: new Date().toISOString(),
  },
];

export default function Notebooks() {
  return (
    <>
      <CreateNotebook />
      {notebooks.map((notebook) => (
        <NotebookCard
          key={notebook.id}
          {...notebook}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      ))}
    </>
  );
}
