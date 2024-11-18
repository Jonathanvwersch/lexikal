"use client";

import { useState } from "react";
import { ReactNode } from "react";
import { BreadCrumbsContext } from "./breadcrumbs-context";

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [trailingPath, setTrailingPath] = useState("");

  return (
    <BreadCrumbsContext.Provider value={{ trailingPath, setTrailingPath }}>
      {children}
    </BreadCrumbsContext.Provider>
  );
}
