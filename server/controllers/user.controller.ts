import { Router } from "express";
import * as userService from "../services/user.service";
import jwtMiddleware from "../middlewares/jwt.middleware";

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
  .put("/password/:id", jwtMiddleware, (req, res, next) =>
    userService
      .updatePassword(req.params.id, req.user, req.body.password, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put("/email/:id", jwtMiddleware, (req, res, next) =>
    userService
      .updateEmail(req.params.id, req.user, req.body.email, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .delete("/:id", jwtMiddleware, (req, res, next) =>
    userService
      .deleteById(req.params.id, req.user, next)
      .then(result => {
        result.success ? res.send(result) : res.status(400).send(result);
      })
      .catch(next)
  )
  .put("/notifications/:id", jwtMiddleware, (req, res, next) =>
    userService
      .updateNotificationSettings(req.params.id, req.user, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put("/privacy/:id", jwtMiddleware, (req, res, next) =>
    userService
      .updatePrivacySettings(req.params.id, req.user, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );

export default router;
