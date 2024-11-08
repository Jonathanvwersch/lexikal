import NotebookSidebarLayout from "@/app/notebooks/components/notebook-sidebar/sidebar-layout";
import { SidebarInset } from "@/components/ui/sidebar";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { getContexts } from "@/api/server/contexts";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: Promise<{ notebookId: string; contextId?: string }>;
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
        <SidebarInset>{children}</SidebarInset>
      </NotebookSidebarLayout>
    </ServerSideFetchAndHydrate>
  );
}
