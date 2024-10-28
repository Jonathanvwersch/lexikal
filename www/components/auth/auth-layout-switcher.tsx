import { getAuthUser } from "@/utils/user/server";

type Props = {
  ifAuth: React.ReactNode;
  ifUnauth: React.ReactNode;
};

export async function AuthLayoutSwitcher({ ifAuth, ifUnauth }: Props) {
  const authUser = await getAuthUser();

  if (authUser) {
    return ifAuth;
  }

  return <>{ifUnauth}</>;
}
