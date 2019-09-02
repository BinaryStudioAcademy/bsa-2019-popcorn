import * as movieService from "../services/movie.service";
import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";
import UserRepository from "../repository/user.repository";
import { sendPushMessage } from "../services/firebase.service";
import { saveNotificitation } from "../services/notification.service";
import { getCustomRepository } from "typeorm";
const uuid = require("uuid/v4");
export default socket => {
  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });

  socket.on("send-message-to-discussion", async messageInfo => {
    const entityIdName = messageInfo.entityIdName;
    if (entityIdName === "movieId") {
      const discussion = await movieService.saveDiscussionMessage(messageInfo);
    }
    if (entityIdName === "eventId") {
      const discussion = await eventService.createComment(messageInfo);
      const event = await eventService.getEventById(discussion.eventId);
      const url = `/events/${messageInfo.eventId}/discussion`;
      const title = `${messageInfo.user.name} left message in your event`;
      const userId = event.userId;
      const user = await getCustomRepository(UserRepository).findOne({
        id: userId
      });
      if (
        userId !== messageInfo.user.id &&
        user.siteNotificationEvents &&
        user.siteNotificationComments
      ) {
        const notification = {
          img: messageInfo.user.avatar,
          type: "comment",
          title,
          body: messageInfo.text,
          date: new Date(),
          url,
          id: uuid(),
          entityType: "event",
          entityId: event.id
        };
        await saveNotificitation({
          ...notification,
          userId,
          isRead: false
        });
        sendPushMessage({
          link: url,
          title,
          body: messageInfo.text,
          icon: messageInfo.user.avatar,
          userId,
          entityType: "event",
          entityId: event.id
        });
        socket.to(event.userId).emit("new-notification", notification);
      }
    }
    socket
      .to(entityIdName.concat(messageInfo[entityIdName]))
      .emit("add-message-to-discussion", messageInfo);
  });
};
