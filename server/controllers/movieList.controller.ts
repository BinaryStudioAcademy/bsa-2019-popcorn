import { Router } from "express";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import * as movieListService from "../services/movieList.service";

const router = Router();

router

  .get("/:userId", (req, res, next) =>
    movieListService
      .getListsByUserId(req.params.userId)
      .then(result => res.send(result))
      .catch(next)
  )
  .post("/", (req, res, next) =>
    movieListService
      .saveMovieList(req.user.id, req.body)
      .then(result => res.send(result))
      .catch(next)
  );

export default router;
