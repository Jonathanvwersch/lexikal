import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { GoogleLoginButton } from "./google-login-button";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export const iframeHeight = "600px";

export const containerClassName =
  "w-full h-screen flex items-center justify-center px-4";

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto h-full flex flex-col items-center justify-center">
        <GoogleLoginButton />
      </CardContent>
    </Card>
  );
}
