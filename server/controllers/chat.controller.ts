import { Router, NextFunction, Request, Response } from "express";
import * as chatService from "../services/chat.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import { User } from "../models/UserModel";

const router = Router();

router
  .get(
    "/:userId",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      chatService
        .getChatsByUser(req.params.userId, next)
        .then(result => res.send(result))
        .catch(next)
  )
  .get(
    "/:userId/:chatId",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      chatService
        .getMessagesByChatId(req.params.chatId, next)
        .then(result => res.send(result))
        .catch(next)
  )
  .post(
    "/",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      chatService
        .createChat(req.body.user1Id, req.body.user2Id, next)
        .then(result => res.send(result))
        .catch(next)
  )
  .post(
    "/:userId/:chatId",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      chatService
        .createMessage(
          req.params.chatId,
          req.params.userId,
          req.body.body,
          next
        )
        .then(result => res.send(result))
        .catch(next)
  );

export default router;
