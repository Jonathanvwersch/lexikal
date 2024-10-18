import { Sidebar } from "@/components/notebook-sidebar/sidebar";
import { NotebookSidebarProvider } from "@/context/notebook-sidebar/notebook-sidebar-context";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function NotebookSidebarLayout({ children }: Props) {
  return (
    <div className="flex">
      <NotebookSidebarProvider>
        <Sidebar />
      </NotebookSidebarProvider>
      <div
        className={cn(
          "min-h-[100vh] transition-[margin-left] ease-in-out duration-300 w-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}
