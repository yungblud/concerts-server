import { type FastifyPluginCallback } from "fastify";
import { handleMe } from "./handlers";
import { authTokenMiddleware } from "../../../lib/middlewares";

const meRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route({
    method: ["GET"],
    url: "/",
    onRequest: authTokenMiddleware,
    handler: handleMe,
  });
  done();
};

export default meRoutes;
