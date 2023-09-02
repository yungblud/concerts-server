import { type FastifyPluginCallback } from "fastify";
import { handleMe } from "./handlers";
import { authTokenMiddleware } from "../../../lib/middlewares";
import { type HandleMeReplyType } from "./types";

const meRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Reply: HandleMeReplyType;
  }>({
    method: ["GET"],
    url: "/",
    onRequest: authTokenMiddleware,
    handler: handleMe,
    schema: {
      description: "get logged in user info",
      summary: "get logged in user info",
      tags: ["me"],
      response: {
        200: {
          $ref: "UserMe",
          description: "successful response",
        },
      },
    },
  });
  done();
};

export default meRoutes;
