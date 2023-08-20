import { type FastifyPluginCallback } from "fastify";
import {
  type CreateAccountAuthCodeReply,
  type CreateAccountAuthCodeBodyType,
  type RegisterAccountBodyType,
  type RegisterAccountReply,
} from "./types";
import { register, createAccountAuthCodeHandler } from "./handlers";

const accountRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: RegisterAccountBodyType;
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

  instance.route<{
    Body: CreateAccountAuthCodeBodyType;
    Reply: CreateAccountAuthCodeReply;
  }>({
    method: ["POST"],
    url: "/auth-code",
    handler: createAccountAuthCodeHandler,
  });

  done();
};

export default accountRoutes;
