import { Notebook } from "@/types/notebook";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import { apiFetch } from "./fetch";

export const fetchNotebooks = async (): Promise<Notebook[]> => {
  return apiFetch<Notebook[]>({ endpoint: "/notebooks" });
};

export const useNotebooks = (): UseQueryResult<Notebook[], Error> => {
  return useQuery({
    queryKey: ["notebooks"],
    queryFn: fetchNotebooks,
  });
};

export const createNotebook = async (name: string): Promise<Notebook> => {
  return apiFetch<Notebook>({
    endpoint: "/notebooks",
    options: {
      method: "POST",
      body: JSON.stringify({ name }),
    },
  });
};

export const useCreateNotebook = () => {
  return useMutation<Notebook, Error, string>({
    mutationFn: createNotebook,
  });
};

export const fetchNotebook = async (id: string): Promise<Notebook> => {
  return apiFetch<Notebook>({
    endpoint: `/notebooks/${id}`,
  });
};

export const useNotebook = (id: string): UseQueryResult<Notebook, Error> => {
  return useQuery({
    queryKey: ["notebook", id],
    queryFn: () => fetchNotebook(id),
  });
};
