import { Router } from "express";
import * as searchService from "../services/search.service";

const router = Router();

router.post("/", (req, res, next) => {
  searchService
    .contentSearch(req.body)
    .then(response => res.send(response))
    .catch(next);
});

export default router;
