import Fastify from "fastify";
import apiV1Routes from "./routers/v1.0/routes";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const fastify = Fastify({
  logger: true,
});

// Run the server!
async function run(): Promise<void> {
  try {
    fastify.addSchema({
      $id: "UserMe",
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        email: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
      },
    });
    fastify.addSchema({
      $id: "AuthToken",
      type: "object",
      properties: {
        authToken: {
          type: "string",
        },
        refreshToken: {
          type: "string",
        },
      },
    });
    fastify.addSchema({
      $id: "RegisterAccountBody",
      type: "object",
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
          nullable: true,
        },
        connected_sns: {
          type: "string",
          enum: ["apple", "facebook", "twitter", "google"],
          nullable: true,
        },
      },
    });
    fastify.addSchema({
      $id: "RegisteredAccount",
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            email: {
              type: "string",
            },
            created_at: {
              type: "string",
            },
          },
        },
        authToken: {
          type: "string",
        },
      },
    });
    fastify.addSchema({
      $id: "CreateConcertBody",
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        concert_date: {
          type: "string",
        },
      },
    });
    fastify.addSchema({
      $id: "CreateAccountAuthCodeBody",
      type: "object",
      properties: {
        email: {
          type: "string",
        },
      },
    });
    fastify.addSchema({
      $id: "SendAccountAuthCodeResult",
      type: "object",
      properties: {},
    });
    await fastify.register(swagger, {
      swagger: {
        info: {
          title: "Concerts API Swagger",
          version: "1.0.0",
        },
        host: "localhost",
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"],
      },
    });
    // register swagger UI
    await fastify.register(swaggerUI, {
      routePrefix: "/swagger",
    });
    // Declare a route
    await fastify.register(apiV1Routes, { prefix: "/v1.0" });
    await fastify.ready();
    fastify.swagger();
    void fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

void run();
