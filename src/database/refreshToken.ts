import RefreshToken from "../models/RefreshToken";
import { appPrisma } from "./prismaInstance";

export const createRefreshToken = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<RefreshToken> => {
  const data = await appPrisma.refreshToken.create({
    data: {
      user_id: userId,
      token,
    },
  });

  const refreshToken = new RefreshToken(data);

  return refreshToken;
};
