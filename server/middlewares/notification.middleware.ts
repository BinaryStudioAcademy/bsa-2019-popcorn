import * as movieService from "../services/movie.service";
import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";
export function getServiceByEntityName(entityIdNames: string[]) {
  let service = null;
  entityIdNames.forEach(entityIdName => {
    switch (entityIdName) {
      case "movieId":
        service = "movieService";
      case "eventId":
        service = "eventService";
      case "postId":
        service = "postService";
    }
  });
  return service;
  // switch (entityIdName) {
  //   case "movieId":
  //     return movieService;
  //   case "eventId":
  //     return eventService;
  //   case "postId":
  //     return postService;
  // }
}
export default async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.url === "/api/post/comment") {
      const post = await postService.getUserByPost(req.body.postId);
      // console.log('')
      if (req.user && post.user.id !== req.user.id)
        req.io.to(post.user.id).emit("new-notification", {
          img: req.user.avatar,
          type: "comment",
          text: `${req.user.name} comment your post`,
          date: new Date()
          // entityId: post.id
        });
    }
    if (req.url === "/api/event/visitor") {
      const event = await eventService.getUserByEventId(req.body.eventId);
      if (req.user && event.user.id !== req.user.id)
        req.io.to(event.userId).emit("new-notification", {
          img: req.user.avatar,
          type: "review",
          text: `${req.user.name} ${req.body.status} to your event`,
          date: new Date()
          // entityId: post.id
        });
    }
    if (req.url === "/api/post/reaction") {
      const post = await postService.getUserByPost(req.body.postId);
      if (req.user && post.user.id !== req.user.id)
        req.io.to(post.userId).emit("new-notification", {
          img: req.user.avatar,
          type: "like",
          text: `${req.user.name} reacted to your post`,
          date: new Date()
          // entityId: post.id
        });
    }
    // let service = getServiceByEntityName(req.body && req.body.keys());
    console.log(req.url, req.body, req.user);
  }
  next();
};
