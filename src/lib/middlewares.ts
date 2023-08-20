/* eslint-disable @typescript-eslint/no-misused-promises */
import { type onRequestHookHandler } from "fastify";
import { decodeAuthToken } from "./authToken";
import { getUserById } from "../database/user";
import { isAfter } from "date-fns";

export const staffUserPermissionMiddleware: onRequestHookHandler =
  async () => {};

export const authTokenMiddleware: onRequestHookHandler = async (
  req,
  rep,
  done,
) => {
  const { authorization } = req.headers;
  // check authorization header for token
  if (authorization === undefined) {
    return await rep.status(403).send({
      error: "not authorized",
    });
  }

  const authToken = authorization;
  const decoded = decodeAuthToken(authToken);
  if (decoded == null) {
    return await rep.status(400).send({
      error: "token decode error",
    });
  }

  const { exp } = decoded;
  // todo: compare exp with new Date
  const isExpired = isAfter(new Date(exp * 1000), new Date());

  if (isExpired) {
    return await rep.status(498).send({
      error: "expired token",
    });
  }

  const user = await getUserById(decoded.id);
  if (user == null) {
    return await rep.status(498).send({
      error: "invalid token",
    });
  }

  done();
};
