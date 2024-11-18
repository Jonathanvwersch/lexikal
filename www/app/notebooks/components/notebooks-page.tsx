import NotebookGrid from "./notebook-grid";
import { Notebooks } from "./notebooks";
import { CreateNotebook } from "./create-notebook";

export function NotebooksPage() {
  return (
    <NotebookGrid>
      <CreateNotebook />
      <Notebooks />
    </NotebookGrid>
  );
}
