import { z } from "zod";

export const AccountAuthCodeSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  auth_code: z.string().length(6),
  invalidation_date: z.date(),
  created_at: z.date(),
});

export type AccountAuthCodeSchemaType = z.infer<typeof AccountAuthCodeSchema>;
