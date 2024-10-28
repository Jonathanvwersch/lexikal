import { createClient } from "../supabase/server";
import { GoogleAuthUser } from "./types";

export async function getAuthUser(): Promise<GoogleAuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.user_metadata as GoogleAuthUser | null;
}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
