import { type UserSchemaType } from "../schema/user";

export type UserSerialize = Omit<
  UserSchemaType,
  "is_staff" | "password" | "password_salt" | "connected_sns"
>;
