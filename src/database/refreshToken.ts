import RefreshToken from "../models/RefreshToken";
import { appPrisma } from "./prismaInstance";
import { addDays } from "date-fns";

export const createRefreshToken = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<RefreshToken> => {
  const createdDate = new Date();
  const data = await appPrisma.refreshToken.create({
    data: {
      user_id: userId,
      token,
      created_at: createdDate,
      invalidation_date: addDays(createdDate, 21),
    },
  });

  const refreshToken = new RefreshToken(data);

  return refreshToken;
};

export const deleteRefreshTokenByUserId = async (
  userId: string,
): Promise<void> => {
  await appPrisma.refreshToken.delete({
    where: {
      user_id: userId,
    },
  });
};
