import { getNotebooks } from "@/api/server/notebooks";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";

export default function NotebooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerSideFetchAndHydrate
      queryKeys={["get-notebooks"]}
      queryFns={[getNotebooks]}
    >
      {children}
    </ServerSideFetchAndHydrate>
  );
}
