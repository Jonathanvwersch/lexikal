import { GoogleLoginButton } from "../auth/google-login-button";
import { LandingPageLayout } from "./layout";

export function LandingPage() {
  return (
    <LandingPageLayout>
      <GoogleLoginButton />
    </LandingPageLayout>
  );
}
