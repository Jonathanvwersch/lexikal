import { AppLayout } from "@/components/app/layout";
import { AuthLayoutSwitcher } from "@/components/auth/auth-layout-switcher";
import { LandingPage } from "@/components/landing-page/landing-page";
import NotebookGrid from "@/components/notebooks/notebook-grid";
import Notebooks from "@/components/notebooks/notebooks";

export default async function Home() {
  return (
    <>
      {await AuthLayoutSwitcher({
        ifAuth: (
          <AppLayout>
            <NotebookGrid>
              <Notebooks />
            </NotebookGrid>
          </AppLayout>
        ),
        ifUnauth: <LandingPage />,
      })}
    </>
  );
}
