import NotebookSidebarLayout from "@/app/notebooks/components/notebook-sidebar/sidebar-layout";
import { NotebookChat } from "@/app/notebooks/components/chat/chat-notebook";
import { SidebarInset } from "@/components/ui/sidebar";
import { NotebookHeader } from "./components/header/notebook-header";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: { notebookId: string };
}

export default function NotebookLayout({
  children,
  params,
}: NotebookLayoutProps) {
  return (
    <NotebookSidebarLayout>
      <SidebarInset>
        <NotebookHeader notebookId={params.notebookId} />
        <div className="flex-1 space-y-4 flex-grow relative">
          <main className="flex items-center justify-between space-y-2 w-full h-full p-4 ">
            {children}
            <NotebookChat />
          </main>
        </div>
      </SidebarInset>
    </NotebookSidebarLayout>
  );
}
