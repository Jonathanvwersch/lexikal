import _NotebookLayout from "../../components/notebook-layout";

interface NotebookLayoutProps {
  children: React.ReactNode;
  params: Promise<{ notebookId: string; contextId?: string }>;
}

export default async function ContextLayout({
  children,
  params,
}: NotebookLayoutProps) {
  const { notebookId, contextId } = await params;
  console.log("Upper params", await params);
  return (
    <_NotebookLayout params={{ notebookId, contextId }}>
      {children}
    </_NotebookLayout>
  );
}
