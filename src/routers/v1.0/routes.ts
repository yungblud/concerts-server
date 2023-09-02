import { type FastifyPluginCallback } from "fastify";
import accountRoutes from "./account/routes";
import concertRoutes from "./concert/routes";
import authRoutes from "./auth/routes";
import meRoutes from "./me/routes";

// api/v1
const apiV1Routes: FastifyPluginCallback = (instance, opts, done) => {
  // account route
  void instance.register(accountRoutes, { prefix: "/account" });
  // concert route
  void instance.register(concertRoutes, { prefix: "/concert" });
  // auth route
  void instance.register(authRoutes, { prefix: "/auth" });
  // me route
  void instance.register(meRoutes, { prefix: "/me" });
  done();
};

export default apiV1Routes;
