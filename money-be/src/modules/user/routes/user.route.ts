import { FastifyInstance } from "fastify";
import { userController } from "../controller/user.controller";
import {
  getUserSchema,
  getUsersForChatSchema,
} from "../schema/user.schema";

export async function userRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
      ...getUserSchema,
    },
    userController.getUser
  );
  app.get(
    "/forChat",
    {
      preHandler: [app.authenticate],
      ...getUsersForChatSchema,
    },
    userController.getUsersForChat
  );
}
