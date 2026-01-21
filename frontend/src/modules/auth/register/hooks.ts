import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useRegister } from "@/utils/auth";

import type { RegisterDTO } from "./types";

const useAuthRegister = () => {
  const router = useRouter();

  const { mutate, isPending } = useRegister();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleRegister = (values: RegisterDTO) => {
    const data = {
      ...values,
    };

    mutate(data, {
      onSuccess: () => {
        router.push(`/auth/two-steps?email=${data.email}`);
        toast.success("Check your email. We've sent a code to your email.");
        setIsDisabled(true);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  return { handleRegister, isLoading: isDisabled || isPending };
};

export { useAuthRegister };
