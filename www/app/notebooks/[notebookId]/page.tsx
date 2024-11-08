import NotebookLayout from "./components/notebook-layout";
import { NotebookParams } from "./types";

type Props = Readonly<{
  params: Promise<NotebookParams>;
}>;

export default async function NotebookPage({ params }: Props) {
  return <NotebookLayout params={params}>TEST</NotebookLayout>;
}
