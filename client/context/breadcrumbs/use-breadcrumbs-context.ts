import { useContext } from "react";
import { BreadCrumbsContext } from "./breadcrumbs-context";

export const useBreadcrumbsContext = () => {
  const context = useContext(BreadCrumbsContext);

  if (!context) {
    throw new Error(
      "useBreadcrumbsContext must be used within a BreadCrumbsProvider"
    );
  }

  return context;
};
