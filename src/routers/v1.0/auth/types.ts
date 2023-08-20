export interface GenerateTokenBody {
  email: string;
  password?: string;
}

export type GenerateTokenReply =
  | {
      authToken: string;
      refreshToken: string;
    }
  | {
      error: string;
    };
