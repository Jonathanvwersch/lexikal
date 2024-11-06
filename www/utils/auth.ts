import { toast } from "@/hooks/use-toast";
import { createClient } from "./supabase/client";

export async function handleSignOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = "/";
}

export async function handleGoogleLogin(redirectTo?: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${
          redirectTo || "/"
        }`,
      },
    });
    if (error) {
      toast({
        title: "Something went wrong.",
        description: error.message,
      });

      return { error: true };
    }
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
}
