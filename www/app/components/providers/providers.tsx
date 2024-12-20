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
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <BreadcrumbsProvider>{children}</BreadcrumbsProvider>
        </ThemeProvider>
      </UserProvider>
    </ReactQueryProvider>
  );
}
