import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useSocialLogin } from "@/services/oauth";

const useSocialLoginProcess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestMade = useRef(false);
  const code = searchParams.get("code");

  const { platform } = useParams();
  const { mutate } = useSocialLogin({
    config: {
      onSuccess: () => {
        router.push("/");
        toast.success("Welcome! You're now logged in.");
      },
      onError: () => {
        router.push("/auth/login");
      },
    },
  });

  useEffect(() => {
    if (code && platform && !requestMade.current) {
      requestMade.current = true;
      const values = { code, platform: platform as string };

      mutate(values, {});
    }
  }, [code, platform, router, mutate]);
};

export { useSocialLoginProcess };