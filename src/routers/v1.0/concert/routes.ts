import { type FastifyPluginCallback } from "fastify";
import { type CreateConcertBodyType } from "./types";
import { handleCreateConcert, handleOnRequestCreateConcert } from "./handlers";

const concertRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: CreateConcertBodyType;
  }>({
    method: "POST",
    url: "/",
    onRequest: handleOnRequestCreateConcert,
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
