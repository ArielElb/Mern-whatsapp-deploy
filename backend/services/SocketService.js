const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");
const http = require("http");

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(process.env.SOCKET_PORT, () => {
  console.log("listening on *:4000");
});

io.on("connection", (socket) => {
  console.log("connected from socket");
  const { username } = socket.handshake.auth;
  const user = User.findOne({ username: username }).then((user) => {
    if (!user) {
      console.log("error: user not found when connecting to socket");
      return false;
    }
    const prevSock = user.room;
    if (prevSock != undefined) {
      io.to(prevSock).emit("forceDisconnect");
    }
    user.room = socket.id;
    user.save();
  });
});

const sendToSocket = async (chatId, message, currentUsername) => {
  const chat = await Chat.findOne({ _id: chatId }).populate("users");
  const recieverName =
    chat.users[1].username == currentUsername
      ? chat.users[0].username
      : chat.users[1].username;
  const user = await User.findOne({ username: recieverName });
  // if someone is in the chat room
  if (user.room != undefined) {
    const IoMessage = { id: chatId, message: message };
    io.to(user.room).emit("newMessage", IoMessage);
    return true;
  } else return false;
};

module.exports = { io, sendToSocket };
