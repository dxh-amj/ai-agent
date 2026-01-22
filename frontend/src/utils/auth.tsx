import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "@/modules/auth/login/service";
import { register } from "@/modules/auth/register/service";
import { logOut } from "@/shared/api/logout";
import { getUser } from "@/shared/api/userProfile";

import type { RegisterDTO } from "@/modules/auth/register/types";
import type { LoginDTO } from "@/shared/types";

// Custom auth hooks without react-query-auth
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDTO) => login(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterDTO) => register(data),
    onSuccess: () => {
      toast.success("Registration successful! Please check your email.");
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: string) => logOut(data),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
      toast.success("Logged out successfully!");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
};
