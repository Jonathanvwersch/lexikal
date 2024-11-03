import { getSession } from "@/utils/user/server";
import { authFetch } from "../auth";
import { Options } from "@hey-api/client-fetch";

export async function serverAuthFetch<
  T,
  D extends Options<T> | Record<string, never>
>(fetchFunction: (options: D) => Promise<T>, data: D = {} as D) {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found");
  }

  return await authFetch(session, fetchFunction, data);
}
