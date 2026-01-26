"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { sendContactMessage, type ContactDTO } from "@/services/contact";

export const useContact = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ContactDTO) => sendContactMessage(data),
    onSuccess: (data) => {
      toast.success(data.message || "Your message has been received!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleContactSubmit = (values: ContactDTO, resetForm: () => void) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  return {
    handleContactSubmit,
    isLoading: isPending,
  };
};
