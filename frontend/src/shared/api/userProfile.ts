import { useQuery } from "@tanstack/react-query";

import { axios, toCamelCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";

import type { UserProfile } from "@/shared/types";
import type { ExtractFnReturnType, QueryConfig } from "@/utils/reactQuery";

const GET_PROFILE_URL = `/api/users/v1/users/me`;

export const getUser = async (): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(GET_PROFILE_URL);
    const profile = toCamelCase(response.data);
    return profile;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

type UseUserProfileOptions = {
  config?: QueryConfig<typeof getUser>;
};

const useUserProfile = ({ config }: UseUserProfileOptions = {}) => {
  return useQuery<ExtractFnReturnType<any>>({
    ...config,
    queryKey: ["user-profile"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes - data stays in cache for 10 minutes (renamed from cacheTime)
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on component mount if data exists
    retry: 1, // Only retry once on failure
  });
};

export { useUserProfile };
