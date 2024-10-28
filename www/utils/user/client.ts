import { createClient } from "../supabase/client";
import { GoogleAuthUser } from "./types";

export async function getAuthUser(): Promise<GoogleAuthUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.user_metadata as GoogleAuthUser | null;
}

export async function getSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
