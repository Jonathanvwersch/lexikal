import { getNotebooks } from "@/api/notebooks";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { queryKeys } from "@/react-query/keys";
export default function NotebooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerSideFetchAndHydrate
      queryKeys={queryKeys.notebooks.get}
      queryFns={[(data) => getNotebooks({ data, isServer: true })]}
    >
      {children}
    </ServerSideFetchAndHydrate>
  );
}
