import { type RouteHandler } from "fastify";
import { type RegisterAccountBody, type RegisterAccountReply } from "./types";
import { createUser, getUserByEmail } from "../../../database/user";
import encryptPassword from "../../../lib/encryptPassword";
import {
  generateAuthToken,
  generateRefreshToken,
} from "../../../lib/authToken";
import { createRefreshToken } from "../../../database/refreshToken";

export const register: RouteHandler<{
  Body: RegisterAccountBody;
  Reply: RegisterAccountReply;
}> = async (req, rep) => {
  const { email, password, connected_sns: connectedSNS } = req.body;

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
      password !== undefined
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
