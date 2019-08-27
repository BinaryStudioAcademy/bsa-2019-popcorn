import { Router, NextFunction, Request, Response } from "express";
import * as favoriteListService from "../services/faloriteList.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";

const router = Router();

router.post(
  "/:id",
  errorHandlerMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    favoriteListService
      .updateFavoriteMoviesByUserId(req.params.id, req.body.movieIds, next)
      .then(result => res.send(result))
      .catch(next)
);

export default router;
