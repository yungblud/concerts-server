import { type RouteHandler } from "fastify";
import { getUserAuthInfoByEmail } from "../../../database/user";
import { type GenerateTokenBody, type GenerateTokenReply } from "./types";
import encryptPassword from "../../../lib/encryptPassword";
import {
  generateAuthToken,
  generateRefreshToken,
} from "../../../lib/authToken";
import {
  createRefreshToken,
  deleteRefreshTokenByUserId,
} from "../../../database/refreshToken";

export const handleGenerateToken: RouteHandler<{
  Body: GenerateTokenBody;
  Reply: GenerateTokenReply;
}> = async (req, rep) => {
  const { email, password } = req.body;

  try {
    const user = await getUserAuthInfoByEmail(email);
    if (user == null) {
      return await rep.status(404).send({
        error: "not existing account",
      });
    }

    const isSNSUser = user.isSNSUser();
    const userSalt = user.getPasswordSalt();
    const emailSignedUpUser =
      !isSNSUser && userSalt !== null && userSalt !== undefined;

    if (emailSignedUpUser && password === undefined) {
      return await rep.status(400).send({
        error: "password is not provided",
      });
    }

    if (emailSignedUpUser && userSalt === undefined) {
      return await rep.status(403).send({
        error: "not existing salt",
      });
    }

    if (!emailSignedUpUser) {
      // todo: sns
      return await rep.status(501).send({
        error: "sns signup is not implemented yet",
      });
    }

    const encryptedPassword =
      emailSignedUpUser && password !== undefined
        ? encryptPassword({
            originalSalt: userSalt,
            plain: password,
          })
        : undefined;

    // validate password
    const isCorrectPassword =
      encryptedPassword?.encrypted === user.getPassword();

    if (!isCorrectPassword) {
      return await rep.status(404).send({
        error: "account not existing",
      });
    }

    const authToken = generateAuthToken({
      email,
      id: user.getId(),
    });

    await deleteRefreshTokenByUserId(user.getId());

    const refreshToken = await createRefreshToken({
      userId: user.getId(),
      token: generateRefreshToken({
        email,
        id: user.getId(),
        authToken,
      }),
    });

    return await rep.status(201).send({
      authToken,
      refreshToken: refreshToken.getToken(),
    });
  } catch (e) {
    console.error(e);
    return await rep.status(500).send({
      error: "internal server error",
    });
  }
};
