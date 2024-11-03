import { useMutation, useQuery } from "@tanstack/react-query";
import { MutationOptions, QueryOptions } from "./types";
import { postNotebook, getNotebooks } from "./client/notebooks";
import { keys } from "./keys";

export const usePostNotebook = (
  options: MutationOptions<typeof postNotebook>
) => {
  return useMutation({
    ...options,
    mutationFn: postNotebook,
    mutationKey: [keys.notebooks.post],
  });
};

export const useGetNotebooks = (
  options?: QueryOptions<typeof getNotebooks>
) => {
  return useQuery({
    ...options,
    queryKey: [keys.notebooks.get],
    queryFn: getNotebooks,
  });
};
