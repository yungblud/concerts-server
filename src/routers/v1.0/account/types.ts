import {
  UserConnectedSNSSchema,
  type UserSchemaType,
} from "../../../schema/user";

import { z } from "zod";

export const RegisterAccountBodySchema = z.object({
  email: z.string(),
  password: z.string().nullish(),
  connected_sns: UserConnectedSNSSchema,
  account_auth_code: z.string().length(6),
});

export type RegisterAccountBodyType = z.infer<typeof RegisterAccountBodySchema>;

export type RegisterAccountReply =
  | {
      user: Omit<
        UserSchemaType,
        "is_staff" | "password" | "password_salt" | "connected_sns"
      >;
      authToken: string;
    }
  | {
      error: string;
    };

export const CreateAccountAuthCodeBodySchema = z.object({
  email: z.string(),
});

export type CreateAccountAuthCodeBodyType = z.infer<
  typeof CreateAccountAuthCodeBodySchema
>;

export type CreateAccountAuthCodeReply =
  | {
      error: string;
    }
  // eslint-disable-next-line @typescript-eslint/ban-types
  | {};
