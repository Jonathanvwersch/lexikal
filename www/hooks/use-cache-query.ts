import { QueryKey } from "@/api/keys";
import { useQueryClient } from "@tanstack/react-query";

type Props = Readonly<{
  queryKey: QueryKey;
}>;

export function useCacheQuery<T>({ queryKey }: Props) {
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<T>(queryKey);
  return cachedData;
}
