const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

let io;
function init(server) {
  io = socketIO(server);
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
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

module.exports = { init, getIO, sendToSocket };
