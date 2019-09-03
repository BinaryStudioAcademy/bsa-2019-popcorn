import { Request, Router } from "express";
import * as userTempService from "../services/userTemp.service";

const router = Router();

router.put("/:token", (req, res, next) =>
  userTempService
    .updateUserByToken(req.params.token)
    .then(data => res.send(data))
    .catch(next)
);

export default router;
