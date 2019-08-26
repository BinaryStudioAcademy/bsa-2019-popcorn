import * as movieService from "../services/movie.service";
import * as eventService from "../services/event.service";
import * as postService from "../services/post.service";

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
      const event = await eventService.getUserByEventId(discussion.eventId);
      socket.to(event.userId).emit("new-notification", {
        img: messageInfo.user.avatar,
        type: "comment",
        text: `${messageInfo.user.name} left message in your event`,
        date: new Date()
      });
    }
    socket
      .to(entityIdName.concat(messageInfo[entityIdName]))
      .emit("add-message-to-discussion", messageInfo);
  });
};
