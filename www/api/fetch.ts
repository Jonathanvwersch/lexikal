import { getSession } from "@/utils/user/client";

const API_BASE_URL = "http://localhost:8000/api/v1";

export async function apiFetch<T>({
  endpoint,
  options,
  auth = true,
}: {
  endpoint: string;
  options?: RequestInit;
  auth?: boolean;
}): Promise<T> {
  const session = auth ? await getSession() : null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: session?.access_token
      ? `Bearer ${session.access_token}`
      : "",
    ...options?.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
