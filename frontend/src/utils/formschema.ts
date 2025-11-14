import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  phonenumber: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const ContactSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  name: yup.string().required("Full name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

export const LibrarySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  media: yup.string().optional(),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
});

export const LibraryUpdateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  media: yup.string().optional(),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
});
