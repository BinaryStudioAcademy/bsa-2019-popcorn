import { Router } from "express";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import * as reviewAnalysisService from "../services/reviewAnalysis.service";

const router = Router();

router
  .post("/", errorHandlerMiddleware, (req, res, next) => {
    const result = reviewAnalysisService.getRatingByReview(req.body.review, next);
    return res.send(result);
  })

export default router;
