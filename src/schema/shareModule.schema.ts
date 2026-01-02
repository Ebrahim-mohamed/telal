import { z } from "zod";

export const shareSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  email: z.string().nonempty({ message: "Invalid E-mail" }),
});

export type ShareType = z.infer<typeof shareSchema>;
