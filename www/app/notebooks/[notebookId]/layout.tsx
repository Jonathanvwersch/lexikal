import NotebookSidebarLayout from "@/app/notebooks/components/notebook-sidebar/sidebar-layout";
import { SidebarInset } from "@/components/ui/sidebar";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { getContexts } from "@/api/contexts";
import { queryKeys } from "@/react-query/keys";
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
      queryFns={[
        () =>
          getContexts({
            data: { path: { notebook_id: notebookId } },
            isServer: true,
          }),
      ]}
    >
      <NotebookSidebarLayout>
        <SidebarInset>{children}</SidebarInset>
      </NotebookSidebarLayout>
    </ServerSideFetchAndHydrate>
  );
}
