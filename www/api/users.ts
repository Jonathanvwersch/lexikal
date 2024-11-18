import { getUserUsersMeGet } from "@/generated/services.gen";
import { authWrapper } from "./auth";
import { ApiParams } from "./types";

export const getMe = async ({ isServer }: ApiParams = {}) => {
  const res = await authWrapper(getUserUsersMeGet, {}, isServer);
  return res.data;
};
