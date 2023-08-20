import { type FastifyPluginCallback } from "fastify";
import { type CreateConcertBodyType } from "./types";
import { handleCreateConcert } from "./handlers";
import { staffUserPermissionMiddleware } from "../../../lib/middlewares";

const concertRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: CreateConcertBodyType;
  }>({
    method: "POST",
    url: "/",
    onRequest: staffUserPermissionMiddleware,
    handler: handleCreateConcert,
    schema: {
      description: "create concert (admin permission)",
      summary: "create concert (admin permission)",
      tags: ["concert"],
      body: {
        $ref: "CreateConcertBody",
      },
    },
  });
  done();
};

export default concertRoutes;
