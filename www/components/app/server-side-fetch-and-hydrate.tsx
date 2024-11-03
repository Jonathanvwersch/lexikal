import { QueryKey } from "@/api/keys";
import { NotebooksPage as _NotebooksPage } from "@/app/notebooks/components/notebooks-page";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryFunction,
} from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  queryKeys: QueryKey[];
  queryFns: QueryFunction[];
};

export default async function ServerSideFetchAndHydrate({
  children,
  queryKeys,
  queryFns,
}: Props) {
  const queryClient = new QueryClient();

  await Promise.all(
    queryFns.map((queryFn) =>
      queryClient.prefetchQuery({
        queryKey: queryKeys,
        queryFn,
      })
    )
  );

  console.log(queryClient.getQueryState(queryKeys));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
