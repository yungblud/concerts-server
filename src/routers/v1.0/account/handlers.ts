import { type RouteHandler } from "fastify";
import {
  type CreateAccountAuthCodeBodyType,
  RegisterAccountBodySchema,
  type RegisterAccountBodyType,
  type RegisterAccountReply,
  CreateAccountAuthCodeBodySchema,
  type CreateAccountAuthCodeReply,
} from "./types";
import { createUser, getUserByEmail } from "../../../database/user";
import encryptPassword from "../../../lib/encryptPassword";
import {
  generateAuthToken,
  generateRefreshToken,
} from "../../../lib/authToken";
import { createRefreshToken } from "../../../database/refreshToken";
import { sendAccountAuthCodeEmail } from "../../../lib/email";
import { createAccountAuthCode } from "../../../database/accountAuthCode";

export const createAccountAuthCodeHandler: RouteHandler<{
  Body: CreateAccountAuthCodeBodyType;
  Reply: CreateAccountAuthCodeReply;
}> = async (req, rep) => {
  const validation = CreateAccountAuthCodeBodySchema.safeParse(req.body);
  if (!validation.success) {
    return await rep.status(400).send({
      error: "invalid body",
    });
  }
  const { email } = validation.data;
  const accountAuthCode = await createAccountAuthCode(email);
  const authCode = accountAuthCode.getAuthCode();
  await sendAccountAuthCodeEmail(email, authCode);
  return await rep.status(200).send({});
};

export const register: RouteHandler<{
  Body: RegisterAccountBodyType;
  Reply: RegisterAccountReply;
}> = async (req, rep) => {
  const validation = RegisterAccountBodySchema.safeParse(req.body);
  if (!validation.success) {
    return await rep.status(400).send({
      error: "invalid body",
    });
  }
  const { email, password, connected_sns: connectedSNS } = validation.data;

  try {
    // check existing user by email
    const existingUser = await getUserByEmail(email);
    if (existingUser != null) {
      return await rep.status(409).send({
        error: "already existing account",
      });
    }

    // generate encrypted password
    const encryptedPassword =
      password !== undefined && password !== null
        ? encryptPassword({
            plain: password,
            originalSalt: undefined,
          })
        : undefined;

    const user = await createUser({
      email,
      password: encryptedPassword?.encrypted,
      connected_sns: connectedSNS,
      password_salt: encryptedPassword?.salt,
    });

    if (user == null) {
      return await rep.status(500).send({
        error: "create user failed",
      });
    }

    const authToken = generateAuthToken({
      email: user.getEmail(),
      id: user.getId(),
    });
    const refreshToken = generateRefreshToken({
      authToken,
      email: user.getEmail(),
      id: user.getId(),
    });

    await createRefreshToken({
      userId: user.getId(),
      token: refreshToken,
    });

    return await rep.status(201).send({
      user: user.serialize(),
      authToken,
    });
  } catch (e) {
    console.log(e);
    return await rep.status(500).send({
      error: "internal server error",
    });
  }
};
