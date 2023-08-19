import { z } from "zod";

export const UserConnectedSNSSchema = z
  .union([
    z.literal("apple"),
    z.literal("facebook"),
    z.literal("twitter"),
    z.literal("google"),
  ])
  .nullish();

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().nullish(),
  password_salt: z.string().nullish(),
  connected_sns: UserConnectedSNSSchema,
  is_staff: z.boolean(),
  created_at: z.date(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type UserConnectedSNSSchemaType = z.infer<typeof UserConnectedSNSSchema>;
