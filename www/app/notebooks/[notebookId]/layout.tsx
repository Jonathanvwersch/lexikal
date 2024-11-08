import _NotebookLayout from "./components/notebook-layout";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: Promise<{ notebookId: string; contextId?: string }>;
}

export default async function NotebookLayout({
  children,
  params,
}: NotebookLayoutProps) {
  const { notebookId } = await params;
  console.log("notebookId", notebookId);
  return <_NotebookLayout params={{ notebookId }}>{children}</_NotebookLayout>;
}
