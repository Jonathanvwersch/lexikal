import { HeaderMainAppLayout } from "@/components/app/header-main-app-layout";
import { NotebooksPage } from "./components/notebooks-page";

export default async function AppNotebooksPage() {
  return (
    <HeaderMainAppLayout>
      <NotebooksPage />
    </HeaderMainAppLayout>
  );
}
