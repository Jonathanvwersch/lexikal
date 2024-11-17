import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error(
      "Attempted to use client-only Supabase client on the server"
    );
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
