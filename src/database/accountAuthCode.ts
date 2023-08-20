import AccountAuthCode from "../models/AccountAuthCode";
import { appPrisma } from "./prismaInstance";
import { addMinutes } from "date-fns";

export const createAccountAuthCode = async (
  email: string,
): Promise<AccountAuthCode> => {
  const sixDigitNumber = Math.floor(100000 + Math.random() * 900000);
  const data = await appPrisma.accountAuthCode.create({
    data: {
      email,
      auth_code: `${sixDigitNumber}`,
      invalidation_date: addMinutes(new Date(), 30),
    },
  });

  return new AccountAuthCode(data);
};

export const getAccountAuthCodeByEmail = async (
  email: string,
): Promise<AccountAuthCode | null> => {
  const data = await appPrisma.accountAuthCode.findFirst({
    where: {
      email,
    },
  });

  if (data == null) return null;

  return new AccountAuthCode(data);
};
