import NotebookLayout from "../components/notebook-layout";
import { Contexts } from "./components/contexts";

type Props = Readonly<{
  params: Promise<{ notebookId: string }>;
}>;

export default async function ContextsPage({ params }: Props) {
  const { notebookId } = await params;

  return (
    <NotebookLayout params={params}>
      <Contexts notebookId={notebookId} />
    </NotebookLayout>
  );
}
