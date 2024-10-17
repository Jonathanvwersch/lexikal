import { AppLayout } from "@/components/app/layout";

interface NewNotebookLayoutProps {
  children: React.ReactNode;
}

export default function NewNotebookLayout({
  children,
}: NewNotebookLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
