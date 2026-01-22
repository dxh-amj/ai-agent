"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { deleteCookie, setCookie } from "cookies-next";

import { useLogin } from "@/utils/auth";
import { encrypt } from "@/utils/encryption";

import type { LoginDTO, LoginResponse } from "@/shared/types";

const useAuthLogin = () => {
  const router = useRouter();

  const { mutate, isPending } = useLogin();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogin = (values: LoginDTO) => {
    if (values?.rememberMe) {
      setCookie("email", values.email);
      setCookie("password", encrypt(values.password));
    } else {
      deleteCookie("email");
      deleteCookie("password");
    }

    mutate(values, {
      onSuccess: (response: LoginResponse) => {
        const data = response as LoginResponse;

        if (data.mfaRequired) {
          const queryParams = new URLSearchParams();

          queryParams.append("token", data.mfaToken || "");

          if (data.mfaType) {
            queryParams.append("type", data.mfaType);
          }

          if (data.phoneNo) {
            queryParams.append("phone", data.phoneNo);
          }

          router.push(`/auth/multi-factor?${queryParams.toString()}`);
          setIsDisabled(true);
          return;
        }

        router.push("/");
        toast.success("Welcome! You're now logged in.");
        setIsDisabled(true);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  return { handleLogin, isLoading: isDisabled || isPending };
};

export { useAuthLogin };
