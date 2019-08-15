import { Router, NextFunction, Request, Response } from "express";
import * as eventService from "../services/event.service";

import { Event, EventComment, EventVisitor } from "../models/Events";
import { Event as EventEntity } from "../entities/Events";

const router = Router();

router
  .get("/user/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .getEventsByUserId(req.params.id)
      .then((events: Event[]) => res.send(events))
      .catch(next)
  )
  .get("/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .getEventById(req.params.id)
      .then((movie: Event) => res.send(movie))
      .catch(next)
  )
  .post("/", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .createEvent(req.body)
      .then((response: Event) => res.send(response))
      .catch(next)
  )
  .delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .deleteEventById(req.params.id)
      .then((response: Event) => res.send(response))
      .catch(next)
  )
  .put("/", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .updateEvent(req.body)
      .then((response: Event[]) => res.send(response))
      .catch(next)
  )
  //comments
  .post("/comment", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .createComment(req.body)
      .then((response: EventComment[]) => res.send(response))
      .catch(next)
  )
  .get("/:id/comment", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .getCommentsByEventId(req.params.id)
      .then((response: EventComment[]) => res.send(response))
      .catch(next)
  )
  .delete("/comment/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .deleteCommentById(req.params.id)
      .then((response: EventComment) => res.send(response))
      .catch(next)
  )
  .put("/comment", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .updateComment(req.body)
      .then((response: EventComment[]) => res.send(response))
      .catch(next)
  )
  //visitors
  .post("/visitor", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .createVisitor(req.body)
      .then((response: EventVisitor[]) => res.send(response))
      .catch(next)
  )
  .get("/:id/visitor", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .getVisitorsByEventId(req.params.id)
      .then((response: EventVisitor[]) => res.send(response))
      .catch(next)
  )
  .get("/visitor/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .getEventsByVisitorId(req.params.id)
      .then((response: Event[]) => res.send(response))
      .catch(next)
  )
  .delete("/visitor/:id", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .deleteVisitorById(req.params.id)
      .then((response: EventVisitor) => res.send(response))
      .catch(next)
  )
  .put("/visitor", (req: Request, res: Response, next: NextFunction) =>
    eventService
      .updateVisitor(req.body)
      .then((response: EventVisitor[]) => res.send(response))
      .catch(next)
  );
export default router;
