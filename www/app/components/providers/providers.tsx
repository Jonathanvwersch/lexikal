"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "./react-query-provider";
import { BreadcrumbsProvider } from "@/context/breadcrumbs/breadcrumbs-provider";
import UserProvider from "./user-provider";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Providers({ children }: Props) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <BreadcrumbsProvider>{children}</BreadcrumbsProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
