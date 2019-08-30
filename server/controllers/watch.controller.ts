import { Router } from "express";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";
import * as watchService from "../services/watch.service";

const router = Router();

router

  .get("/", errorHandlerMiddleware, (req, res, next) =>
    watchService
      .getAllUserWatch(req.user.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/movie/:id", errorHandlerMiddleware, (req, res, next) =>
    watchService
      .getWatchStatus(req.user.id, req.params.id, next)
      .then(result => res.send(result))
      .catch()
  )
  .post("/", errorHandlerMiddleware, (req, res, next) =>
    watchService
      .saveNewUserWatch(req.user.id, req.body, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .delete("/:id", errorHandlerMiddleware, (req, res, next) =>
    watchService
      .deleteWatch(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .put("/:id", errorHandlerMiddleware, (req, res, next) =>
    watchService
      .changeWatchStatus(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  );

export default router;
