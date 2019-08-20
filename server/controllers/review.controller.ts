import { Router } from "express";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import * as reviewService from "../services/review.service";

const router = Router();

router
  .post("/", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .createReview(req.body, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/:id", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .getReviewsByMovieId(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  );

export default router;
