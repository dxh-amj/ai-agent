import Axios, { AxiosHeaders } from "axios";
import { getCookie, setCookie } from "cookies-next";

import { ROOT_API_URL } from "@/config";

import { clearStorage } from "./clearStorage";
import { ASSESS_TOKEN, REFRESH_TOKEN } from "./constants";

import type { RetryConfig, TokenResponse } from "./types";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const handleLogout = () => {
  clearStorage();
  window.location.replace("/auth/login");
};

const authRequestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getCookie(ASSESS_TOKEN);
  const language = "en"; // Default language

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set("authorization", `Bearer ${token}`);
    (config.headers as AxiosHeaders).set("Accept-Language", language);
  }
  return config;
};

const axios = Axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosRefresh = Axios.create({
  baseURL: ROOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig;

    const UNAUTHORIZED_STATUS = 401;
    if (error.response?.status === UNAUTHORIZED_STATUS) {
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }
      const MAX_RETRY_COUNT = 3;
      if (originalRequest._retryCount >= MAX_RETRY_COUNT) {
        handleLogout();
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        const token = getCookie(REFRESH_TOKEN);

        if (!token) {
          handleLogout();
          return Promise.reject(error);
        }

        originalRequest._retry = true;
        originalRequest._retryCount++;

        try {
          const response = await axiosRefresh.post<TokenResponse>("/api/auth/v1/token/refresh/", {
            refresh: token,
          });

          const tokens = response?.data?.data?.tokens;

          const refreshToken = tokens?.refresh;
          const accessToken = tokens?.access;

          setCookie(REFRESH_TOKEN, refreshToken, {
            secure: false,
            path: "/",
          });
          setCookie(ASSESS_TOKEN, accessToken, {
            secure: false,
            path: "/",
          });

          if (!originalRequest.headers) {
            originalRequest.headers = new AxiosHeaders();
          }
          (originalRequest.headers as AxiosHeaders).set("authorization", `Bearer ${accessToken}`);
          originalRequest._retry = false;
          return axios(originalRequest);
        } catch (retryError) {
          originalRequest._retry = false;
          return Promise.reject(retryError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export { axios };
