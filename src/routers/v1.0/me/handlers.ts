import { type RouteHandler } from "fastify";

export const handleMe: RouteHandler = async (req, rep) => {
  return await rep.send({});
};
