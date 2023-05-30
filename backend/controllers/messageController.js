const messsageService = require("../services/MessageService");
const socketService = require("../services/SocketService");

// get chats

const getMessages = async (req, res) => {
  try {
    const currentUsername = req.currentUsername;
    const chats = await messsageService.getMessages(currentUsername, req.params.ChatId);
    res.send(chats);
  } catch (error) {
    res.send({ message: error.message });
  }
};

// create a new chat with the contact passed in the request body
const createMessage = async (req, res) => {
  const currentUsername = req.currentUsername;
  const chatId = req.params.ChatId;
  const msgToSend = req.body.msg;
  try {
    // current user , msg
    const newMessage = await messsageService.createMessage(
      currentUsername,
      msgToSend,
      chatId
    );
    const sendToSocket = await socketService.sendToSocket(
      chatId,
      newMessage,
      currentUsername
    );
    if (sendToSocket) {
      // console.log("message sent to socket");
    }
    res.send(newMessage);
  } catch (error) {
    res.send({ message: error.message });
  }
};

module.exports = {
  getMessages,
  createMessage,
};
