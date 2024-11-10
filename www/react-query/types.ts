import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type MutationOptions<
  Fn extends (...args: any) => any,
  TError = Error
> = Omit<
  UseMutationOptions<Awaited<ReturnType<Fn>>, TError, Parameters<Fn>[0]>,
  "mutationKey" | "mutationFn"
>;

export type QueryOptions<
  Fn extends (...args: any) => any,
  TError = Error
> = Omit<
  UseQueryOptions<Awaited<ReturnType<Fn>>, TError>,
  "queryKey" | "queryFn"
>;
