import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { useMFAVerify } from "./service";

import type { MFAFormValues, MFAVerifyDTO } from "./types";
import type { FormikHelpers } from "formik";

const useMFA = (mfaToken: string) => {
  const router = useRouter();
  const { mutate, isPending } = useMFAVerify();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVerifyMFA = (values: MFAFormValues, actions: FormikHelpers<MFAFormValues>) => {
    const mfaValues: MFAVerifyDTO = {
      code: values.code.trim(),
      mfaToken,
    };

    mutate(mfaValues, {
      onSuccess: () => {
        actions.resetForm();
        toast.success("Welcome! You're now logged in.");
        router.push("/");
        setIsDisabled(true);
      },
      onError: () => {
        actions.setSubmitting(false);
        setIsDisabled(false);
      },
    });
  };

  return {
    handleVerifyMFA,
    isLoading: isDisabled || isPending,
  };
};

export { useMFA };
