import { createContext } from "react";

export const BreadCrumbsContext = createContext<{
  trailingPath: string;
  setTrailingPath: (path: string) => void;
}>({
  trailingPath: "",
  setTrailingPath: () => {},
});
