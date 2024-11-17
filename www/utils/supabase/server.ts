import { createServerClient } from "@supabase/ssr";

export const createClient = async () => {
  if (typeof window !== "undefined") {
    throw new Error(
      "Attempted to use server-only Supabase client on the client"
    );
  }

  const cookies = await import("next/headers").then((mod) => mod.cookies);

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
