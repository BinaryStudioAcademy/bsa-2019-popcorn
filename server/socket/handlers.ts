export default socket => {
  socket.on("createRoom", roomId => {
    socket.join(roomId);
  });
  socket.on("leaveRoom", roomId => {
    socket.leave(roomId);
  });

  socket.on("send-message-to-discussion", messageInfo => {
    socket
      .to(messageInfo.movieId)
      .emit("add-message-to-discussion", messageInfo);
  });
};
