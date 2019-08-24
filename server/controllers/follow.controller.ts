import { Router, NextFunction, Request, Response } from "express";
import * as followService from "../services/follow.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";

const router = Router();

router
  .get(
    "/:userId/followers",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      followService
        .getFollowersByUserId(req.params.userId, next)
        .then(result => res.send(result))
        .catch(next)
  )
  .get(
    "/:userId/followings",
    errorHandlerMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      followService
        .getFollowingsByUserId(req.params.userId, next)
        .then(result => res.send(result))
        .catch(next)
  );

export default router;
