import { Router } from "express";
import * as votingService from "../services/voting.service";
import * as votingOptionService from "../services/votingOption.service";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware";

const router = Router();

router
  .get("/", errorHandlerMiddleware, (req, res, next) =>
    votingService
      .getVotings(next)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/:id", errorHandlerMiddleware, (req, res, next) =>
    votingService
      .getVotingById(req.params.id)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/:id/options", errorHandlerMiddleware, (req, res, next) =>
    votingOptionService
      .getVotingOptionByVotingId(req.params.id)
      .then(result => res.send(result))
      .catch(next)
  )
  .post("/:id/options", errorHandlerMiddleware, (req, res, next) => {
    Promise.all(
      req.body.options.map(async option => {
        return await votingService.createVotingOptionByVotingId(
          req.params.id,
          option,
          next
        );
      })
    )
      .then(result => res.send(result))
      .catch(e => {
        console.log(e);
        next(e);
      });
  })
  .put("/options/:id", errorHandlerMiddleware, (req, res, next) =>
    votingOptionService
      .updateVotingOptionById(req.params.id, req.body, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .delete("/options/:id", errorHandlerMiddleware, (req, res, next) =>
    votingOptionService
      .deleteVotingOptionById(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .put("/options/:optionId/react", errorHandlerMiddleware, (req, res, next) =>
    votingOptionService
      .setVotingReaction(req.params.optionId, req.body, next) // req.body: {userId: string, isChosen: boolean}
      .then(result => res.send(result))
      .catch(next)
  )
  .get("/user/:id", errorHandlerMiddleware, (req, res, next) =>
    votingService
      .getVotingByUserId(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .put("/:id", errorHandlerMiddleware, (req, res, next) =>
    votingService
      .updateVotingById(req.params.id, req.body, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .delete("/:id", errorHandlerMiddleware, (req, res, next) =>
    votingService
      .deleteVotingById(req.params.id, next)
      .then(result => res.send(result))
      .catch(next)
  )
  .post("/", (req, res, next) =>
    votingService
      .createVoting(req.body)
      .then(result => res.send(result))
      .catch(next)
  )
  .get("*", (req, res) => res.send("Not Found"));

export default router;
