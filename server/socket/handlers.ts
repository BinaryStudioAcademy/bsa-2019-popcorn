import * as movieService from "../services/movie.service";
import * as eventService from "../services/event.service";
export default socket => {
  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });

  socket.on("send-message-to-discussion", async messageInfo => {
    const entityIdName = messageInfo.entityIdName;
    console.log("message info", messageInfo);
    if (entityIdName === "movieId")
      await movieService.saveDiscussionMessage(messageInfo);
    if (entityIdName === "eventId")
      await eventService.createComment(messageInfo);
    socket
      .to(entityIdName.concat(messageInfo[entityIdName]))
      .emit("add-message-to-discussion", messageInfo);
  });
};
