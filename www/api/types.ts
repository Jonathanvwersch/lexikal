import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type MutationOptions<Fn extends (...args: any) => any> = Omit<
  UseMutationOptions<Awaited<ReturnType<Fn>>, Error, Parameters<Fn>[0]>,
  "mutationKey" | "mutationFn"
>;

export type QueryOptions<Fn extends (...args: any) => any> = Omit<
  UseQueryOptions<Awaited<ReturnType<Fn>>, Error>,
  "queryKey" | "queryFn"
>;
