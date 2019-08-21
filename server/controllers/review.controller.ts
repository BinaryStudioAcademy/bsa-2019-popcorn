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
      .getReviewById(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/movie/:id", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .getReviewsByMovieId(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/:userId/:movieId", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .getReviewByMovieIdUserId(req.params.userId, req.params.movieId, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .put("/:id", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .updateReviewById(req.params.id, req.body, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .delete("/:id", errorHandlerMiddleware, (req, res, next) =>
    reviewService
      .deleteReviewById(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  );
// TODO - get all reviews by user ID

export default router;
