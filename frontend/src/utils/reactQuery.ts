import { QueryClient } from "@tanstack/react-query";

import type { DefaultOptions, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnReconnect: false, // Don't refetch on network reconnect
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
    gcTime: 10 * 60 * 1000, // 10 minutes - data stays in cache
    networkMode: "online", // Only run queries when online
  },
  mutations: {
    retry: false, // Don't retry mutations on error
    networkMode: "online",
  },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

type ExtractFnReturnType<FnType extends (...args: any[]) => any> =
  ReturnType<FnType> extends Promise<infer T> ? T : ReturnType<FnType>;

type QueryConfig<QueryFnType extends (...args: any[]) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
>;

type MutationConfig<MutationFnType extends (...args: any[]) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;

export { queryClient };
export type { ExtractFnReturnType, MutationConfig, QueryConfig };
