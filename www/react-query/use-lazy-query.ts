import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { useCallback, useState } from "react";

/**
 * A type-safe lazy query hook that allows manual query execution
 * @template TQueryFnData The type of data returned by the query function
 * @template TError The type of error that might be thrown
 * @template TData The transformed data type (optional)
 * @template TQueryKey The type of the query key
 */
export function useLazyQuery<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryOptions: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "enabled"
  > & {
    /**
     * Optional initial data for the query
     */
    initialData?: TData;
  }
) {
  // State to control query execution
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  // Merge user options with our custom enabled state
  const mergedQueryOptions: UseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = {
    ...queryOptions,
    enabled: isQueryEnabled,
  };

  // Use React Query's useQuery with our modified options
  const queryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>(
    mergedQueryOptions
  );

  // Function to manually trigger the query
  const query = useCallback(() => {
    setIsQueryEnabled(true);
  }, []);

  // Reset function to disable the query and clear data
  const reset = useCallback(() => {
    setIsQueryEnabled(false);
  }, []);

  // Return an enhanced query result with manual execution methods
  return {
    ...queryResult,
    query,
    reset,
  } as const satisfies {
    query: () => void;
    reset: () => void;
  } & UseQueryResult<TData, TError>;
}
