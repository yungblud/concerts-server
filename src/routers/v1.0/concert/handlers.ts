/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type RouteHandler, type onRequestHookHandler } from "fastify";
import { CreateConcertBodySchema, type CreateConcertBodyType } from "./types";
import { createConcert } from "../../../database/concert";
import { decodeAuthToken } from "../../../lib/authToken";
import { getUserById } from "../../../database/user";

export const handleCreateConcert: RouteHandler<{
  Body: CreateConcertBodyType;
}> = async (req, rep) => {
  const validation = CreateConcertBodySchema.safeParse(req.body);
  if (!validation.success) {
    return rep.status(400).send({
      error: "invalid data",
    });
  }
  const concert = await createConcert(req.body);
  return await rep.send(concert.serialize());
};

export const handleOnRequestCreateConcert: onRequestHookHandler = async (
  req,
  rep,
  done,
) => {
  const { authorization } = req.headers;
  // check authorization header for token
  if (authorization === undefined) {
    return rep.status(403).send({
      error: "not authorized",
    });
  }
  const authToken = authorization;
  const decoded = decodeAuthToken(authToken);
  if (decoded == null) {
    return rep.status(400).send({
      error: "token decode error",
    });
  }
  const user = await getUserById(decoded.id);
  if (user == null) {
    return rep.status(401).send({
      error: "invalid token",
    });
  }
  const isStaff = user.isStaffUesr();
  if (!isStaff) {
    return rep.status(403).send({
      error: "has no permission",
    });
  }
  done();
};
