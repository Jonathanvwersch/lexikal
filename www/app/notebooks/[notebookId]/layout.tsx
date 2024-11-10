import NotebookSidebarLayout from "@/app/notebooks/components/notebook-sidebar/sidebar-layout";
import { SidebarInset } from "@/components/ui/sidebar";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { getContexts } from "@/api/server/contexts";
import { queryKeys } from "@/api/keys";
import { NotebookParams } from "./types";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: Promise<NotebookParams>;
}

export default async function NotebookLayout({
  children,
  params,
}: NotebookLayoutProps) {
  const { notebookId } = await params;

  return (
    <ServerSideFetchAndHydrate
      queryKeys={queryKeys.contexts.get(notebookId)}
      queryFns={[() => getContexts({ path: { notebook_id: notebookId } })]}
    >
      <NotebookSidebarLayout>
        <SidebarInset>{children}</SidebarInset>
      </NotebookSidebarLayout>
    </ServerSideFetchAndHydrate>
  );
}
