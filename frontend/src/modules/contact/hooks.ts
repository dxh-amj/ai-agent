"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useSendContactMessage } from "./service";

import type { ContactDTO } from "./service";

const useContact = () => {
  const { mutate, isPending } = useSendContactMessage();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleContactSubmit = (values: ContactDTO, resetForm: () => void) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success(data?.message || "Your message has been received!");
        resetForm();
        setIsDisabled(true);
      },
      onError: () => {
        setIsDisabled(false);
      },
    });
  };

  return {
    handleContactSubmit,
    isLoading: isDisabled || isPending,
  };
};

export { useContact };
