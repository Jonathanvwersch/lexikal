import NotebookLayout from "../../components/notebook-layout";
import { NotebookParams } from "../../types";

import { ContextViewer } from "./components/context-viewer";

type Props = Readonly<{
  params: Promise<Required<NotebookParams>>;
}>;

export default async function ContextPage({ params }: Props) {
  const { contextId, notebookId } = await params;

  return (
    <NotebookLayout params={params}>
      <ContextViewer notebookId={notebookId} contextId={contextId} />
    </NotebookLayout>
  );
}
