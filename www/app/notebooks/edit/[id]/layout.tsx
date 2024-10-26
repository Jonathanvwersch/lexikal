import { AppLayout } from "@/components/app/layout";

interface EditNotebookLayoutProps {
  children: React.ReactNode;
}

export default function EditNotebookLayout({
  children,
}: EditNotebookLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
