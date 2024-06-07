import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must not exceed 30 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .max(150, "email must not exceed 150 characters"),

  dob: z.string().refine(
    (value) => {
      // Custom validation for date of birth format (dd-mm-yyyy)
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      return regex.test(value);
    },
    {
      message: "Invalid date of birth format. Please use dd-mm-yyyy.",
    },
  ),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Password must contain only alphanumeric characters",
    }),
});
