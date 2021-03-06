import { Router, NextFunction, Request, Response } from "express";
import * as topService from "../services/top.service";

import { Top } from "../models/TopModel";

const router = Router();

router
  .get("/", (req: Request, res: Response, next: NextFunction) =>
    topService
      .getTops()
      .then((tops: Top[]) => res.send(tops))
      .catch(next)
  )

  .get("/extended", (req: Request, res: Response, next: NextFunction) =>
    topService
      .getExtendedTops()
      .then((tops: Top[]) => res.send(tops))
      .catch(next)
  )
  .get("/:id", (req: Request, res: Response, next: NextFunction) =>
    topService
      .getTopById(req.params.id)
      .then((top: Top) => res.send(top))
      .catch(next)
  )
  .get("/user/:id", (req, res, next) =>
    topService
      .getExtendedTops(req.params.id)
      .then((tops: Top[]) => res.send(tops))
      .catch(next)
  )
  .post("/", (req: Request, res: Response, next: NextFunction) =>
    topService
      .createTop(req.body)
      .then((addedTop: Top) => res.send(addedTop))
      .catch(next)
  )
  .post("/user", (req: Request, res: Response, next: NextFunction) =>
    topService
      .createUserTop(req.body)
      .then((addedTop: any) => res.send(addedTop))
      .catch(next)
  )
  .put("/", (req: Request, res: Response, next: NextFunction) =>
    topService
      .updateTop(req.body)
      .then((updatedTop: Top) => res.send(updatedTop))
      .catch(next)
  )
  .put("/user", (req: Request, res: Response, next: NextFunction) =>
    topService
      .updateUserTop(req.body)
      .then((updatedTop: Top) => res.send(updatedTop))
      .catch(next)
  )
  .delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    topService
      .deleteTopById(req.params.id)
      .then((deletedTop: Top) => res.send(deletedTop))
      .catch(next)
  );

export default router;
