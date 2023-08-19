import RefreshToken from "../models/RefreshToken";
import { appPrisma } from "./prismaInstance";
import dateFns from "date-fns";

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
      invalidation_date: dateFns.addDays(createdDate, 21),
    },
  });

  const refreshToken = new RefreshToken(data);

  return refreshToken;
};
