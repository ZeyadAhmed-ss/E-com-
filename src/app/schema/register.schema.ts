import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    rePassword: z.string().min(6, "Please confirm your password"),

    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password do not match",
  });

export default formSchema;