import NotebookLayout from "../../components/notebook-layout";
import { NotebookParams } from "../../types";

type Props = Readonly<{
  params: Promise<NotebookParams>;
}>;

export default async function ContextPage({ params }: Props) {
  return <NotebookLayout params={params}></NotebookLayout>;
}
