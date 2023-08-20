/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type RouteHandler } from "fastify";
import { CreateConcertBodySchema, type CreateConcertBodyType } from "./types";
import { createConcert } from "../../../database/concert";

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
