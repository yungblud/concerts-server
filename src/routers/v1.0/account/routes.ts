import { type FastifyPluginCallback } from "fastify";
import { type RegisterAccountBody, type RegisterAccountReply } from "./types";
import { register } from "./handlers";

const accountRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: RegisterAccountBody;
    Reply: RegisterAccountReply;
  }>({
    method: ["POST"],
    url: "/register",
    handler: register,
    schema: {
      description: "register account",
      tags: ["account"],
      summary: "register account",
      body: {
        $ref: "RegisterAccountBody",
      },
      response: {
        201: {
          $ref: "RegisteredAccount",
        },
      },
    },
  });
  done();
};

export default accountRoutes;
