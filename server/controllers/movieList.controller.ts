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
  .get("/", (req, res, next) =>
    movieListService
      .getOwnUserLists(req.user.id)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/details/:id", (req, res, next) =>
    movieListService
      .getMovieListDetails(req.params.id)
      .then(result => res.send(result))
      .catch(next)
  )
  .post("/", (req, res, next) =>
    movieListService
      .saveMovieList(req.user.id, req.body)
      .then(result => res.send(result))
      .catch(next)
  )
  .delete("/:id", (req, res, next) =>
    movieListService
      .deleteMovieList(req.params.id)
      .then(result => res.send(result))
      .catch(next)
  )
  .put("/:id", (req, res, next) =>
    movieListService
      .updateMovieList(req.params.id, req.body)
      .then(result => res.send(result))
      .catch(next)
  );

export default router;
