import { useQuery } from "@tanstack/react-query";

import { axios, toCamelCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";

import type { UserProfile } from "@/shared/types";
import type { ExtractFnReturnType, QueryConfig } from "@/utils/reactQuery";

const GET_PROFILE_URL = `/api/users/v1/workspace/users/me`;

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
  return useQuery<ExtractFnReturnType<typeof getUser>>({
    ...config,
    queryKey: ["user-profile"],
    queryFn: getUser,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });
};

export { useUserProfile };
