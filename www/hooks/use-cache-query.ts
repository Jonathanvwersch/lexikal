import { QueryKey } from "@/react-query/keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = Readonly<{
  queryKey: QueryKey;
}>;

export function useCacheQuery<T>({ queryKey }: Props) {
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
