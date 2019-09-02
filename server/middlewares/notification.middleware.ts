import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";
import UserRepository from "../repository/user.repository";
import * as followerService from "../services/follow.service";
import PostReactionsRepository from "../repository/postReactions.repository";
import { sendPushMessage } from "../services/firebase.service";
import { saveNotification } from "../services/notification.service";
import { getCustomRepository } from "typeorm";
const uuid = require("uuid/v4");

async function sendNotification({
  req,
  url,
  type,
  body,
  title,
  entity,
  entityType
}) {
  if (req.user && entity.userId === req.user.id) return;
  const notification = {
    img: req.user.avatar,
    type,
    title,
    body,
    date: new Date(),
    url,
    id: uuid(),
    entityType,
    entityId: entity.id
  };
  await saveNotification({
    ...notification,
    userId: entity.userId,
    isRead: false
  });
  sendPushMessage({
    link: url,
    title,
    body,
    icon: req.user.avatar,
    userId: entity.userId,
    entityType,
    entityId: entity.id
  });

  req.io.to(entity.userId).emit("new-notification", notification);
}

export default async (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    if (req.url === "/api/post/comment") {
      const post = await postService.getPostById(req.body.postId);
      const user = await getCustomRepository(UserRepository).findOne({
        id: post.userId
      });
      if (user.siteNotificationComments) {
        const url = "/";
        const title = `${req.user.name} comment your post`;
        sendNotification({
          req,
          url,
          type: "comment",
          title,
          body: req.body.text,
          entity: post,
          entityType: "post"
        });
      }
    }

    if (req.url === "/api/follow") {
      const follower = await getCustomRepository(UserRepository).findOne({
        id: req.body.userId
      });
      const { isFollowing } = await followerService.checkFollowStatus(
        follower.id,
        req.body.followerId
      );
      if (!isFollowing) {
        const title = `${follower.name} started following you`;
        sendNotification({
          req,
          url: `/user-page/${follower.id}`,
          type: "follower",
          title,
          body: "",
          entity: { ...follower, userId: req.body.followerId },
          entityType: "follower"
        });
      }
    }

    if (req.url === "/api/event/visitor") {
      const event = await eventService.getEventById(req.body.eventId);
      const title = `${req.user.name} ${req.body.status} to your event`;
      const user = await getCustomRepository(UserRepository).findOne({
        id: event.userId
      });
      if (user.siteNotificationEvents) {
        sendNotification({
          req,
          url: `/events/${req.body.eventId}/${
            req.body.status === "interested" ? "interested" : "going"
          }`,
          type: "review",
          title,
          body: "",
          entity: event,
          entityType: "event"
        });
      }
    }

    if (req.url === "/api/post/reaction") {
      const { userId, postId, type } = req.body;
      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      const post = await postService.getPostById(postId);
      const postReactionRepository = await getCustomRepository(
        PostReactionsRepository
      );
      if (!(await postReactionRepository.findOne({ user, post, type }))) {
        const title = `${req.user.name} reacted to your post`;
        sendNotification({
          req,
          url: `/`,
          type: req.body.type,
          title,
          body: "",
          entity: post,
          entityType: "post"
        });
      }
    }

    if (req.url === "/api/post/") {
      const userId = req.user.id;
      const followers = await followerService.getFollowersByUserId(userId);
      const title = `${req.user.name} published new post`;
      followers.forEach(({ follower }) => {
        if (follower.siteNotificationUpdatesFromFollowed)
          sendNotification({
            req,
            url: "/",
            type: "new post from followed",
            title: title,
            body: "",
            entity: { ...req.body, userId: follower.id, id: "" },
            entityType: "post"
          });
      });
    }

    if (req.url === "/api/story") {
      const userId = req.user.id;
      const followers = await followerService.getFollowersByUserId(userId);
      const title = `${req.user.name} published new story`;
      followers.forEach(({ follower }) => {
        if (follower.siteNotificationUpdatesFromFollowed)
          sendNotification({
            req,
            url: "/",
            type: "new story from followed",
            title: title,
            body: "",
            entity: { ...req.body, userId: follower.id, id: "" },
            entityType: "story"
          });
      });
    }
  }
  next();
};
