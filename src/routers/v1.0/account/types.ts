import {
  type UserConnectedSNSSchemaType,
  type UserSchemaType,
} from "../../../schema/user";

export interface RegisterAccountBody {
  email: string;
  password?: string;
  connected_sns?: UserConnectedSNSSchemaType;
}

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
