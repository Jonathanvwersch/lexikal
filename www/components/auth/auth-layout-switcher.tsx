import { getAuthUser } from "@/utils/user/server";
import { redirect } from "next/navigation";

type Props =
  | {
      ifAuth: React.ReactNode;
      ifUnauth: React.ReactNode;
    }
  | {
      urlRedirectIfAuth: string;
      ifUnauth: React.ReactNode;
    };

export async function AuthLayoutSwitcher({ ifUnauth, ...props }: Props) {
  const authUser = await getAuthUser();

  if (authUser) {
    if ("ifAuth" in props) {
      return props.ifAuth;
    }
    return redirect(props.urlRedirectIfAuth);
  }

  return <>{ifUnauth}</>;
}
