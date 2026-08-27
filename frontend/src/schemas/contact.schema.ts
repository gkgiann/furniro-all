import { z } from "zod";

export const contactSchema = z.object({
  yourName: z.string().min(1, "Your name is required."),
  email: z.email("Email is required."),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
