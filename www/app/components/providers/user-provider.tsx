import { getMe } from "@/api/users";
import ServerSideFetchAndHydrate from "@/components/app/server-side-fetch-and-hydrate";
import { queryKeys } from "@/react-query/keys";

type Props = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: Props) {
  return (
    <ServerSideFetchAndHydrate
      queryKeys={queryKeys.users.getMe}
      queryFns={[(data) => getMe({ data, isServer: true })]}
    >
      {children}
    </ServerSideFetchAndHydrate>
  );
}
