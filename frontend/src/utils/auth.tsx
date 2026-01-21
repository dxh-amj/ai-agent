import { configureAuth } from "react-query-auth";

import { login } from "@/modules/auth/login/service";
import { register } from "@/modules/auth/register/service";
import { logOut } from "@/shared/api/logout";
import { getUser } from "@/shared/api/userProfile";

import type { RegisterDTO } from "@/modules/auth/register/types";
import type { LoginDTO } from "@/shared/types";

async function registerFn(data: RegisterDTO) {
  const response = await register(data);
  return response;
}

async function userFn() {
  const response = await getUser();
  return response;
}

async function loginFn(data: LoginDTO) {
  const response = await login(data);
  return response;
}

async function logoutFn(data: unknown) {
  const response = await logOut(data as string);
  return response;
}

const authConfig: any = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
};

export const { useUser, useLogin, useRegister, useLogout } = configureAuth(authConfig);
