import { NotebookHeader } from "./header/notebook-header";
import { NotebookParams } from "../types";
import { NotebookMain } from "./notebook-main";

type NotebookLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<NotebookParams>;
}>;

export default async function NotebookLayout({
  children,
  params,
}: NotebookLayoutProps) {
  const { notebookId, contextId } = await params;

  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      <NotebookHeader notebookId={notebookId} contextId={contextId} />
      <NotebookMain>{children}</NotebookMain>
    </div>
  );
}
