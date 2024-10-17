import NotebookSidebarLayout from "@/components/notebook-sidebar/notebook-sidebar-layout";
import { Header } from "@/components/header/header";
import { NotebookSidebarProvider } from "@/context/notebook-sidebar/notebook-sidebar-context";

interface NotebookLayoutProps {
  children: React.ReactNode;
}

export default function NotebookLayout({ children }: NotebookLayoutProps) {
  return (
    <NotebookSidebarProvider>
      <NotebookSidebarLayout>
        <div className="flex-col w-full">
          <Header showLogo={false} showSidebarToggle={true} />
          <div className="flex-1 space-y-4 p-8 pt-6">
            <main className="flex items-center justify-between space-y-2 w-full">
              {children}
            </main>
          </div>
        </div>
      </NotebookSidebarLayout>
    </NotebookSidebarProvider>
  );
}
