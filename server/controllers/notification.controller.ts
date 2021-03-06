import { Router, NextFunction, Response } from "express";
import * as firebaseService from "../services/firebase.service";
import * as notificationService from "../services/notification.service";

const router = Router();

router
  .put("/", (req: any, res: Response, next: NextFunction) =>
    firebaseService
      .storeAppInstanceToken({ ...req.body, userId: req.user.id })
      .then(response => {
        res.send(response);
      })
      .catch(next)
  )
  .get("/:id", (req: any, res: Response, next: NextFunction) =>
    notificationService
      .getNotificationsByUserId(req.params.id)
      .then(response => {
        res.send(response);
      })
      .catch(next)
  )
  .delete("/:id", (req: any, res: Response, next: NextFunction) =>
    notificationService
      .setNotificationIsRead(req.params.id)
      .then(response => {
        res.send(response);
      })
      .catch(next)
  )
  .delete("/token/:id", (req: any, res: Response, next: NextFunction) =>
    firebaseService
      .deleteAppInstanceToken(req.params.id, req.user.id)
      .then(response => {
        res.send(response);
      })
      .catch(next)
  );
export default router;
