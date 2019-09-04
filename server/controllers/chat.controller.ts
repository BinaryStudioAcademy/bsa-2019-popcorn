import { Router, NextFunction, Request, Response } from "express";
import * as chatService from "../services/chat.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import notificationMiddeware from "../middlewares/notification.middleware";
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
    notificationMiddeware,
    (req: Request & { io: any }, res: Response, next: NextFunction) =>
      chatService
        .createMessage(
          req.params.chatId,
          req.params.userId,
          req.body.body,
          next
        )
        .then(result => {
          req.io.to(req.params.chatId).emit("new-message", result);
          res.send({ result });
        })
        .catch(next)
  )
  .delete(
    "/:id",
    errorHandlerMiddleware,
    (req: Request & { io: any }, res: Response, next: NextFunction) =>
      chatService
        .deleteMessage(req.params.id, next)
        .then(result => {
          req.io.to(result.chatId).emit("delete-message", {
            chatId: result.chatId,
            messageId: req.params.id
          });
          res.send({ result });
        })
        .catch(next)
  )
  .put(
    "/:id",
    errorHandlerMiddleware,
    (req: Request & { io: any }, res: Response, next: NextFunction) =>
      chatService
        .updateMessage(req.params.id, req.body.body, next)
        .then(result => {
          req.io.to(result.chatId).emit("update-message", result);
          res.send({ result });
        })
        .catch(next)
  )
  .put(
    "/:chatId/:userId/read",
    errorHandlerMiddleware,
    (req: Request & { io: any }, res: Response, next: NextFunction) =>
      chatService
        .readMessagesByChatId(req.params.chatId, req.params.userId, next)
        .then(result => {
          req.io.to(req.params.chatId).emit("read-chat", result);
          res.send({ result });
        })
        .catch(next)
  );

export default router;
