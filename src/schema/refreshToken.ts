import { z } from "zod";

export const RefreshTokenSchema = z.object({
  token: z.string(),
  user_id: z.string(),
  created_at: z.date(),
});

export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
