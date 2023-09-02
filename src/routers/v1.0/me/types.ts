import { type UserSerialize } from "../../../models/types";

export type HandleMeReplyType =
  | {
      error: string;
    }
  | UserSerialize;
