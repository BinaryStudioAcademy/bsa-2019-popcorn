import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";
import { sendPushMessage } from "../services/firebase.service";
import { text } from "body-parser";

function sendNotification({ req, url, type, body, title, entity }) {
  sendPushMessage({
    link: url,
    title: title,
    body,
    icon: req.user.avatar
  });
  if (req.user && entity.userId !== req.user.id) {
    req.io.to(entity.userId).emit("new-notification", {
      img: req.user.avatar,
      type: type,
      text: title,
      date: new Date(),
      url
    });
  }
}

export default async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.url === "/api/post/comment") {
      const post = await postService.getPostById(req.body.postId);
      const url = "/";
      const title = `${req.user.name} comment your post`;
      sendNotification({
        req,
        url,
        type: "comment",
        title,
        body: req.body.text,
        entity: post
      });
    }

    if (req.url === "/api/event/visitor") {
      const event = await eventService.getEventById(req.body.eventId);
      const title = `${req.user.name} ${req.body.status} to your event`;
      sendNotification({
        req,
        url: `/events/${req.body.eventId}/${
          req.body.status === "interested" ? "interested" : "going"
        }`,
        type: "review",
        title,
        body: "",
        entity: event
      });
    }
    if (req.url === "/api/post/reaction") {
      const post = await postService.getPostById(req.body.postId);
      const title = `${req.user.name} reacted to your post`;
      sendNotification({
        req,
        url: `/`,
        type: "like",
        title,
        body: "",
        entity: post
      });
    }
  }
  console.log(req.body);
  next();
};
