import { useBreadcrumbsContext } from "@/context/breadcrumbs/use-breadcrumbs-context";
import { useEffect, useLayoutEffect } from "react";

export const useBreadCrumbs = (trailingPath?: string) => {
  const { setTrailingPath } = useBreadcrumbsContext();

  useLayoutEffect(() => {
    setTrailingPath(trailingPath ? trailingPath : "loading");
    return () => setTrailingPath("");
  }, [trailingPath, setTrailingPath]);
};
