/* eslint-disable @typescript-eslint/no-misused-promises */
import { type onRequestHookHandler } from "fastify";
import { decodeAuthToken, getAuthTokenFromRequest } from "./authToken";
import { getUserById } from "../database/user";
import { isAfter } from "date-fns";

export const staffUserPermissionMiddleware: onRequestHookHandler = async (
  req,
  rep,
  done,
) => {
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

  const { exp } = decoded;
  const isExpired = isAfter(new Date(exp * 1000), new Date());

  if (isExpired) {
    return await rep.status(498).send({
      error: "expired token",
    });
  }

  const user = await getUserById(decoded.id);
  if (user == null) {
    return await rep.status(401).send({
      error: "token has no permission by user",
    });
  }

  if (!user.isStaffUesr()) {
    return await rep.status(403).send({
      error: "no permission",
    });
  }

  done();
};

export const authTokenMiddleware: onRequestHookHandler = async (
  req,
  rep,
  done,
) => {
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

  const { exp } = decoded;
  const isExpired = isAfter(new Date(), new Date(exp * 1000));

  if (isExpired) {
    return await rep.status(498).send({
      error: "expired token",
    });
  }

  const user = await getUserById(decoded.id);
  if (user == null) {
    return await rep.status(401).send({
      error: "token has no permission by user",
    });
  }

  done();
};
