import { HeaderMainAppLayout } from "@/components/app/header-main-app-layout";

interface NewNotebookLayoutProps {
  children: React.ReactNode;
}

export default function NewNotebookLayout({
  children,
}: NewNotebookLayoutProps) {
  return <HeaderMainAppLayout>{children}</HeaderMainAppLayout>;
}
