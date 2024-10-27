import Link from "next/link";

import { Logo } from "../ui/logo";
import { GoogleAuthButton } from "./google-auth-button";
import { APP_SUBHEADING } from "@/constants/app";

export default function SignUpForm() {
  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-2xl font-semibold text-center">Sign up</h1>
          <div className="flex flex-col gap-2">
            <GoogleAuthButton>Google</GoogleAuthButton>
            <p className="text-center text-xs">
              Already have an account?{" "}
              <Link href="/log-in" className="underline">
                Log in
              </Link>
            </p>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo
            asLink={false}
            textClassName="text-white"
            iconClassName="w-8 h-8"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <p className="text-lg">{APP_SUBHEADING}</p>
        </div>
      </div>
    </div>
  );
}
