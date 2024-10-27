"use client";

import { Icons } from "@/assets/icons";
import { Button } from "../ui/button";
import { handleGoogleLogin } from "@/utils/auth";

export function GoogleAuthButton({
  redirectTo,
  children,
}: {
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      onClick={() => handleGoogleLogin(redirectTo)}
      Icon={Icons.google}
      variant="outline"
    >
      {children}
    </Button>
  );
}
