import { useContext } from "react";
import { ContextsContext } from "./contexts-context";

export const useContextsContext = () => {
  const context = useContext(ContextsContext);

  if (!context) {
    throw new Error(
      "useContextsContext must be used within a ContextsProvider"
    );
  }

  return context;
};
