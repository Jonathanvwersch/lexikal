import { QueryKey } from "@/react-query/keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  queryKeys: QueryKey;
  queryFns: QueryFunction[];
};

export default async function ServerSideFetchAndHydrate({
  children,
  queryKeys,
  queryFns,
}: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable retries on the server since we want to fail fast
        retry: false,
        // Disable refetching on window focus since this is server-side
        refetchOnWindowFocus: false,
      },
    },
  });

  try {
    await Promise.all(
      queryFns.map((queryFn) =>
        queryClient.prefetchQuery({
          queryKey: Array.isArray(queryKeys) ? queryKeys : [queryKeys],
          queryFn,
          staleTime: Infinity,
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
