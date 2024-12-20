import {
  GetUserUsersMeGetError,
  GetUserUsersMeGetResponse,
} from "@/generated/types.gen";
import { getMe } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

import { QueryOptions } from "@tanstack/react-query";
import { queryKeys } from "./keys";

/* GET ME */

export const getMeQueryKeyAndFn = () => {
  return {
    queryKey: queryKeys.users.getMe,
    queryFn: () => getMe(),
  };
};

export const useGetMe = (
  options?: Omit<
    QueryOptions<GetUserUsersMeGetResponse | undefined, GetUserUsersMeGetError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<
    GetUserUsersMeGetResponse | undefined,
    GetUserUsersMeGetError
  >({
    ...options,
    ...getMeQueryKeyAndFn(),
  });
};
