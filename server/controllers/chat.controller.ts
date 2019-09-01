import { Router, NextFunction, Request, Response } from "express";
import * as chatService from "../services/chat.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import { User } from "../models/UserModel";

const router = Router();

router
  .get(
    "/",
    errorHandlerMiddleware,
    (req: Request & { user: User }, res: Response, next: NextFunction) =>
      chatService
        .getChatsByUser(req.user, next)
        .then(result => res.send(result))
        .catch(next)
  )
  .get(
    "/:id",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      chatService
        .getChatById(req.params.id, next)
        .then(result => res.send(result))
        .catch(next)
  );

export default router;
