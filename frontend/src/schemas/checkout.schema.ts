import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  companyName: z.string().optional(),
  zipCode: z.string().min(1, "ZIP Code is required.").regex(/^\d{5}-?\d{3}$/, "Enter a valid ZIP Code (8 digits)."),
  country: z.string().min(1, "Country / Region is required."),
  streetAddress: z.string().min(1, "Street address is required."),
  townCity: z.string().min(1, "Town / City is required."),
  province: z.string().min(1, "Province is required."),
  addOnAddress: z.string().optional(),
  emailAddress: z.email("Email is required."),
  additionalInformation: z.string().optional(),
  paymentMethod: z.enum(["direct", "cod"], { error: "Select a payment method." }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
