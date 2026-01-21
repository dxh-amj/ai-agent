import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 8;

export const registerSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password should be of minimum 8 characters length")
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
