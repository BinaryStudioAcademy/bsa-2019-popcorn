import { Router } from "express";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import * as movieListService from "../services/movieList.service";

const router = Router();

router.post("/", errorHandlerMiddleware, (req, res, next) =>
  movieListService
    .saveMovieList(req.user.id, req.body, next)
    .then(result => res.send(result))
    .catch(next)
);

export default router;
