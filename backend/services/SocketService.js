const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

// create http server
const httpServer = require("http").createServer();
// socket.io and then i added cors for cross origin to localhost only
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://backend-whatsapp.onrender.com", //specific origin you want to give access to,
  },
});
// listen to port
httpServer.listen(process.env.SOCKET_PORT, () => {
  console.log("listening on *:3000");
});
// when a socket connects

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
