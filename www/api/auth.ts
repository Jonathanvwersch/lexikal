import { getClientSession } from "@/utils/user/client";
import { getServerSession } from "@/utils/user/server";
import { createClient, createConfig, Options } from "@hey-api/client-fetch";
import { Session } from "@supabase/supabase-js";

const HEY_API_CLIENT_CONFIG = {
  baseUrl: "http://127.0.0.1:8000/api/v1",
};

const client = createClient(createConfig(HEY_API_CLIENT_CONFIG));

async function authFetch<T, D extends Options<T> | Record<string, never>>(
  session: Session,
  fetchFunction: (options: D) => Promise<T>,
  data: D = {} as D
): Promise<T> {
  const authHeader = {
    Authorization: `Bearer ${session?.access_token}`,
  };

  return await fetchFunction({
    client,
    ...data,
    headers: { ...data.headers, ...authHeader },
  });
}

async function getSessionUtil(isServer = false) {
  if (isServer) {
    return getServerSession();
  }
  return getClientSession();
}

export async function authWrapper<
  T,
  D extends Options<T> | Record<string, never>
>(
  fetchFunction: (options: D) => Promise<T>,
  data: D = {} as D,
  isServer = false
) {
  const session = await getSessionUtil(isServer);

  if (!session) {
    throw new Error("No session found");
  }

  return await authFetch(session, fetchFunction, data);
}
