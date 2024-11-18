"use client";

import { useState } from "react";
import { ReactNode } from "react";
import { ContextsContext } from "./contexts-context";

export function ContextsProvider({ children }: { children: ReactNode }) {
  const [checkedContexts, setCheckedContexts] = useState<string[]>([]);

  return (
    <ContextsContext.Provider value={{ checkedContexts, setCheckedContexts }}>
      {children}
    </ContextsContext.Provider>
  );
}
