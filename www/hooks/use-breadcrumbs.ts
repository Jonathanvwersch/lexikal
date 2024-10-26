import { useBreadcrumbsContext } from "@/context/breadcrumbs/use-breadcrumbs-context";
import { useEffect } from "react";

export const useBreadCrumbs = (trailingPath?: string) => {
  const context = useBreadcrumbsContext();

  useEffect(() => {
    context.setTrailingPath(trailingPath ? trailingPath : "loading");
    return () => context.setTrailingPath("");
  }, [trailingPath, context]);
};
