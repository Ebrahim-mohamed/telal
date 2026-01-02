import { z } from "zod";
export const loginSchema = z.object({
  userName: z.string().nonempty({ message: "Please enter your username" }),
  password: z.string().min(8, {
    message: "Please enter a password that contains at least 8 characters",
  }),
});

export type LoginType = z.infer<typeof loginSchema>;
