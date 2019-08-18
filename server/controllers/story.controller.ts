import { Router, NextFunction, Request, Response } from "express";
import * as StoryService from "../services/story.service";
import { Story } from "../models/StoryModel";

const router = Router();

router
  .get("/", (req: Request, res: Response, next: NextFunction) =>
    StoryService.getStories()
      .then((response: Array<Story>) => res.send(response))
      .catch(next)
  )
  .get("/:id", (req: Request, res: Response, next: NextFunction) =>
    StoryService.getStorybyId(req.params.id)
      .then((response: Story) => res.send(response))
      .catch(next)
  )
  .post("/", (req: Request & { io: any }, res: Response, next: NextFunction) =>
    StoryService.createStory(req.body)
      .then((response: Story) => {
        req.io.emit("new-story", response);
        res.send(response);
      })
      .catch(next)
  )
  .put("/", (req: Request, res: Response, next: NextFunction) =>
    StoryService.updateStory(req.body)
      .then((response: Story) => res.send(response))
      .catch(next)
  )
  .delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    StoryService.deleteStoryById(req.params.id)
      .then((response: Story) => res.send(response))
      .catch(next)
  );

export default router;
