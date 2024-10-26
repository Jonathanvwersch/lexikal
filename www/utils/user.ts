import { createClient } from "./supabase/server";

type GoogleAuthUser = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  name: string;
  phone_verified: boolean;
  sub: string;
  iss: string;
  provider_id: string;
  picture: string;
};

export async function getAuthUser(): Promise<GoogleAuthUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.user_metadata as GoogleAuthUser | null;
}
