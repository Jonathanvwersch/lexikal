import { SidebarProvider } from "../ui/sidebar";
import { NotebookSidebar } from "./sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function NotebookSidebarLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <NotebookSidebar />
      {children}
    </SidebarProvider>
  );
}
