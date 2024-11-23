import { queryKeys } from "@/react-query/keys";
import NotebookLayout from "../../components/notebook-layout";
import { NotebookParams } from "../../types";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { ContextsGetResponse } from "@/generated";
import { useGetContextFile } from "@/react-query/contexts";
import { ContextViewer } from "../components/context-viewer";

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
