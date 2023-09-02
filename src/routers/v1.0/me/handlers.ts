import { type RouteHandler } from "fastify";
import {
  decodeAuthToken,
  getAuthTokenFromRequest,
} from "../../../lib/authToken";
import { getUserById } from "../../../database/user";
import { type HandleMeReplyType } from "./types";

export const handleMe: RouteHandler<{
  Reply: HandleMeReplyType;
}> = async (req, rep) => {
  const authToken = getAuthTokenFromRequest(req);
  if (authToken === undefined) {
    return await rep.status(403).send({
      error: "not authorized",
    });
  }

  const decoded = decodeAuthToken(authToken);
  if (decoded == null) {
    return await rep.status(498).send({
      error: "invalid token",
    });
  }

  const { id: userId } = decoded;
  const user = await getUserById(userId);

  if (user == null) {
    return await rep.status(401).send({
      error: "not authorized",
    });
  }

  return await rep.status(200).send(user.serialize());
};
