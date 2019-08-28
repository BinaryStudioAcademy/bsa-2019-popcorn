import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";
import { sendMessage } from "../services/firebase.service";

export default async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.url === "/api/post/comment") {
      sendMessage();
      const post = await postService.getPostById(req.body.postId);
      if (req.user && post.userId !== req.user.id)
        req.io.to(post.userId).emit("new-notification", {
          img: req.user.avatar,
          type: "comment",
          text: `${req.user.name} comment your post`,
          date: new Date(),
          url: "/"
        });
    }
    if (req.url === "/api/event/visitor") {
      const event = await eventService.getEventById(req.body.eventId);
      if (req.user && event.userId !== req.user.id)
        req.io.to(event.userId).emit("new-notification", {
          img: req.user.avatar,
          type: "review",
          text: `${req.user.name} ${req.body.status} to your event`,
          date: new Date(),
          url: `/events/${req.body.eventId}/${
            req.body.status === "interested" ? "interested" : "going"
          }`
        });
    }
    if (req.url === "/api/post/reaction") {
      const post = await postService.getPostById(req.body.postId);
      if (req.user && post.userId !== req.user.id)
        req.io.to(post.userId).emit("new-notification", {
          img: req.user.avatar,
          type: "like",
          text: `${req.user.name} reacted to your post`,
          date: new Date(),
          url: "/"
        });
    }
  }
  console.log(req.body);
  next();
};
