import { Router, NextFunction, Request, Response } from "express";
import * as firebaseService from "../services/firebase.service";

const router = Router();

router.put("/", (req: any, res: Response, next: NextFunction) =>
  firebaseService
    .storeAppInstanceToken({ ...req.body, userId: req.user.id })
    .then(response => {
      res.send(response);
    })
    .catch(next)
);
export default router;
