import NotebookLayout from "./components/notebook-layout";
import { NotebookParams } from "./types";

type Props = Readonly<{
  params: Promise<NotebookParams>;
}>;

export default function NotebookPage({ params }: Props) {
  return <NotebookLayout params={params}></NotebookLayout>;
}
