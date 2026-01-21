import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter, useSearchParams } from "next/navigation";

import { useSetNewPassword } from "./service";

import type { NewPasswordDTO } from "./types";

const useNewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const { mutate, isPending } = useSetNewPassword();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSetNewPassword = (values: NewPasswordDTO) => {
    const modifiedValues = { ...values, token };

    mutate(modifiedValues, {
      onSuccess: () => {
        toast.success("Password has been successfully reset.");
        router.push("/auth/login");
        setIsDisabled(true);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  return {
    handleSetNewPassword,
    isLoading: isDisabled || isPending,
  };
};

export { useNewPassword };
