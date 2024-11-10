import { getNotebooks } from "@/api/server/notebooks";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { queryKeys } from "@/api/keys";
export default function NotebooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerSideFetchAndHydrate
      queryKeys={queryKeys.notebooks.get}
      queryFns={[getNotebooks]}
    >
      {children}
    </ServerSideFetchAndHydrate>
  );
}
