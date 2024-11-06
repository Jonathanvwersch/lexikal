"use client";

import { Icons } from "@/assets/icons";
import { Button } from "../ui/button";
import { handleGoogleLogin } from "@/utils/auth";
import { useState } from "react";

export function GoogleAuthButton({
  redirectTo,
  children,
}: {
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const result = await handleGoogleLogin(redirectTo);

    if (result?.error) {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      Icon={Icons.google}
      variant="outline"
      isLoading={loading}
    >
      {children}
    </Button>
  );
}
