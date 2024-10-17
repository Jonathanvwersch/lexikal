import { Notebook } from "@/types/notebooks";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:8000";

export const fetchNotebooks = async (): Promise<Notebook[]> => {
  const response = await fetch(`${API_BASE_URL}/notebooks`);
  if (!response.ok) {
    throw new Error("Failed to fetch notebooks");
  }
  return response.json();
};

export const useNotebooks = (): UseQueryResult<Notebook[], Error> => {
  return useQuery({
    queryKey: ["notebooks"],
    queryFn: fetchNotebooks,
  });
};

export const createNotebook = async (name: string): Promise<Notebook> => {
  const response = await fetch(`${API_BASE_URL}/notebooks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create notebook");
  }
  return response.json();
};

export const useCreateNotebook = () => {
  return useMutation<Notebook, Error, string>({
    mutationFn: createNotebook,
  });
};

export const fetchNotebook = async (id: string): Promise<Notebook> => {
  const response = await fetch(`${API_BASE_URL}/notebooks/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notebook");
  }
  return response.json();
};

export const useNotebook = (id: string): UseQueryResult<Notebook, Error> => {
  return useQuery({
    queryKey: ["notebook", id], // Correctly structured as an object
    queryFn: () => fetchNotebook(id),
  });
};
