import { useContext } from "react";
import { NotebookSidebarContext } from "./notebook-sidebar-context";

export const useNotebookSidebar = () => {
  const context = useContext(NotebookSidebarContext);
  if (!context) {
    console.trace();
    throw new Error(
      "useNotebookSidebar must be used within a NotebookSidebarProvider"
    );
  }
  return context;
};
