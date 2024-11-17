import { ApiFunction } from "@/api/types";
import { QueryKey } from "@/react-query/keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  queryKeys: QueryKey;
  queryFns: ApiFunction[];
};

export default async function ServerSideFetchAndHydrate({
  children,
  queryKeys,
  queryFns,
}: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });

  try {
    await Promise.all(
      queryFns.map((queryFn) =>
        queryClient.prefetchQuery({
          queryKey: Array.isArray(queryKeys) ? queryKeys : [queryKeys],
          queryFn: (data) => queryFn({ data, isServer: true }),
          staleTime: Infinity,
          gcTime: Infinity,
        })
      )
    );
  } catch (error) {
    console.error("Error prefetching queries:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
