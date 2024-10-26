"use client";

import { GoogleIcon } from "@/assets/icons/google";
import { Button } from "../ui/button";
import { handleGoogleLogin } from "@/utils/auth";
import {} from "lucide-react";
export function GoogleLoginButton({ redirectTo }: { redirectTo?: string }) {
  return (
    <Button
      onClick={() => handleGoogleLogin(redirectTo)}
      Icon={GoogleIcon}
      iconPlacement="left"
    >
      Sign in with Google
    </Button>
  );
}
