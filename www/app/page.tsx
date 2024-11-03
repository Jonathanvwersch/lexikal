import { AuthLayoutSwitcher } from "@/components/auth/auth-layout-switcher";
import { LandingPage } from "./components/landing-page/landing-page";

export default async function Home() {
  return (
    <>
      {await AuthLayoutSwitcher({
        urlRedirectIfAuth: "/notebooks",
        ifUnauth: <LandingPage />,
      })}
    </>
  );
}
