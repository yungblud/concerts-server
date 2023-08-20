import { type FastifyPluginCallback } from "fastify";
import {
  type CreateAccountAuthCodeReply,
  type CreateAccountAuthCodeBodyType,
  type RegisterAccountBodyType,
  type RegisterAccountReply,
} from "./types";
import { registerHandler, createAccountAuthCodeHandler } from "./handlers";

const accountRoutes: FastifyPluginCallback = (instance, opts, done) => {
  instance.route<{
    Body: RegisterAccountBodyType;
    Reply: RegisterAccountReply;
  }>({
    method: ["POST"],
    url: "/register",
    handler: registerHandler,
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
    schema: {
      description: "create account auth code (register process)",
      summary: "create account auth code (register process)",
      tags: ["account"],
      body: {
        $ref: "CreateAccountAuthCodeBody",
      },
      response: {
        201: {
          $ref: "SendAccountAuthCodeResult",
        },
      },
    },
  });

  done();
};

export default accountRoutes;
