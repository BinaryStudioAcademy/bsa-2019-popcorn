import { Request, Router } from "express";
import * as userService from "../services/user.service";
import * as userTempService from "../services/userTemp.service";
import * as emailService from "../services/email.service";
import jwtMiddleware from "../middlewares/jwt.middleware";
import { User } from "../models/UserModel";
import { UserTemp } from "../models/UserModelTemp";

const router = Router();

router
  .get("/", (req, res, next) =>
    userService
      .getUsers()
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/:id", (req, res, next) =>
    userService
      .getUserById(req.params.id)
      .then(result => {
        result.success ? res.send(result) : res.status(400).send(result);
      })
      .catch(next)
  )
  .put("/:id", (req, res, next) =>
    userService
      .updateById(req.params.id, req.body)
      .then(result => {
        result.success ? res.send(result) : res.status(400).send(result);
      })
      .catch(next)
  )
  .put(
    "/password/:id",
    jwtMiddleware,
    (req: Request & { user: User }, res, next) => {
      emailService.sendConfirmPasswordChange(req.user.email, req.body.token);
      userTempService
        .createTempUser(req.user, req.body, req.params.id)
        .then(data => res.send(data))
        .catch(next);
    }
  )
  .put("/email/:id", (req: Request & { user: User }, res, next) => {
    emailService.sendConfirmEmailChange(req.body.email, req.body.token);
    userTempService
      .createTempUser(req.user, req.body, req.params.id)
      .then(data => res.send(data))
      .catch(next);
  })
  .delete("/:id", jwtMiddleware, (req: Request & { user: User }, res, next) =>
    userService
      .deleteById(req.params.id, req.user, next)
      .then(result => {
        result.success ? res.send(result) : res.status(400).send(result);
      })
      .catch(next)
  )
  .put(
    "/notifications/:id",
    jwtMiddleware,
    (req: Request & { user: User }, res, next) =>
      userService
        .updateNotificationSettings(req.params.id, req.user, req.body, next)
        .then(data => res.send(data))
        .catch(next)
  )
  .put(
    "/privacy/:id",
    jwtMiddleware,
    (req: Request & { user: User }, res, next) =>
      userService
        .updatePrivacySettings(req.params.id, req.user, req.body, next)
        .then(data => res.send(data))
        .catch(next)
  );

export default router;
