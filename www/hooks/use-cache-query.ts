import { QueryKey } from "@/react-query/keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCacheQuery<T>(queryKey: QueryKey) {
  const queryClient = useQueryClient();
  const { data } = useQuery<T>({
    queryKey,
    initialData: () => queryClient.getQueryData<T>(queryKey),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
  return data;
}
