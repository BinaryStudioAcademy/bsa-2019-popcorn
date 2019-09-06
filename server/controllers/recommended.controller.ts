import { Request, Router } from "express";
import { getRecommended } from "../services/recommended.service";
const router = Router();

router.get("/:id", (req, res, next) => {
  getRecommended(req.params.id, next)
    .then(result => res.send(result))
    .catch(next);
});

export default router;
