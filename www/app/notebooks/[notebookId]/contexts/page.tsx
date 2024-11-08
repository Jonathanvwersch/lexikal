import { NotebookChat } from "../../components/chat/chat-notebook";
import { NotebookHeader } from "../components/header/notebook-header";

type Props = Readonly<{
  params: Promise<{ notebookId: string }>;
}>;

export default async function ContextsPage({ params }: Props) {
  const { notebookId } = await params;

  return (
    <>
      <NotebookHeader notebookId={notebookId} />
      <div className="flex-1 space-y-4 flex-grow relative">
        <main className="flex items-center justify-between space-y-2 w-full h-full p-4 ">
          <NotebookChat />
        </main>
      </div>
    </>
  );
}
