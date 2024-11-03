import Link from "next/link";

import { APP_SUBHEADING } from "@/constants/app";
import { Logo } from "@/components/ui/logo";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

export function LoginPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo
            darkMode
            asLink={false}
            textClassName="text-white"
            iconClassName="w-8 h-8"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <p className="text-lg">{APP_SUBHEADING}</p>
        </div>
      </div>
      <div className="lg:p-8 h-full">
        <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px] h-full px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-center">Log in</h1>
          <div className="flex flex-col gap-2">
            <GoogleAuthButton>Google</GoogleAuthButton>
            <p className="text-center text-xs">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
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
    </div>
  );
}
