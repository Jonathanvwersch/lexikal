import NotebookSidebarLayout from "@/app/notebooks/components/notebook-sidebar/sidebar-layout";
import { NotebookChat } from "@/app/notebooks/components/chat/chat-notebook";
import { SidebarInset } from "@/components/ui/sidebar";
import { NotebookHeader } from "./components/header/notebook-header";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { getContexts } from "@/api/server/contexts";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: Promise<{ notebookId: string }>;
}

export default async function NotebookLayout({
  children,
  params,
}: NotebookLayoutProps) {
  const { notebookId } = await params;
  return (
    <ServerSideFetchAndHydrate
      queryKeys={["get-contexts"]}
      queryFns={[() => getContexts({ path: { notebook_id: notebookId } })]}
    >
      <NotebookSidebarLayout>
        <SidebarInset>
          <NotebookHeader notebookId={notebookId} />
          <div className="flex-1 space-y-4 flex-grow relative">
            <main className="flex items-center justify-between space-y-2 w-full h-full p-4 ">
              {children}
              <NotebookChat />
            </main>
          </div>
        </SidebarInset>
      </NotebookSidebarLayout>
    </ServerSideFetchAndHydrate>
  );
}
