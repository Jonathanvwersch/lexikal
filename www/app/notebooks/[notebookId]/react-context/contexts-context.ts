import { createContext } from "react";

export const ContextsContext = createContext<{
  checkedContexts: string[];
  setCheckedContexts: (contexts: string[]) => void;
}>({
  checkedContexts: [],
  setCheckedContexts: () => {},
});
