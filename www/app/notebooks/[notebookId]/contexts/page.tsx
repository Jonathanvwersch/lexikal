import NotebookLayout from "../components/notebook-layout";
import ContextGrid from "./components/context-grid";
import { Contexts } from "./components/contexts";

type Props = Readonly<{
  params: Promise<{ notebookId: string }>;
}>;

export default async function ContextsPage({ params }: Props) {
  const { notebookId } = await params;

  return (
    <NotebookLayout params={params}>
      <ContextGrid>
        <Contexts notebookId={notebookId} />
      </ContextGrid>
    </NotebookLayout>
  );
}
