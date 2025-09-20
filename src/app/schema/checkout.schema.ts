import * as z from "zod";

const checkoutSchema = z.object({
  details: z.string().min(5, "Details must be at least 5 characters"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

export default checkoutSchema;
