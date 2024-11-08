import { NotebookChat } from "@/app/notebooks/components/chat/chat-notebook";
import { NotebookHeader } from "./header/notebook-header";
import { NotebookParams } from "../types";

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
    <div className="flex flex-col h-full relative overflow-hidden">
      <NotebookHeader notebookId={notebookId} contextId={contextId} />
      <div className="flex-1 relative">
        <main className="absolute inset-0 p-4 overflow-auto">{children}</main>
        <NotebookChat />
      </div>
    </div>
  );
}
