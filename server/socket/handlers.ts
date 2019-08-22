import * as movieService from "../services/movie.service";
export default socket => {
  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });

  socket.on("send-message-to-discussion", async messageInfo => {
    await movieService.saveDiscussionMessage(messageInfo);
    socket
      .to(messageInfo.movieId)
      .emit("add-message-to-discussion", messageInfo);
  });
};
