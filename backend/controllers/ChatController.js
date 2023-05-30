//

const chatService = require("../services/ChatService");
// get chats

const getChats = async (req, res) => {
  try {
    const currentUsername = req.currentUsername;
    const chats = await chatService.getChats(currentUsername);
    res.send(chats);
  } catch (error) {
      // check the error status code
    
     res.send({ message: error.message });
  }
};

// create a new chat with the contact passed in the request body
const createChat = async (req, res) => {
  const currentUsername = req.currentUsername;
  try {
    const newChat = await chatService.createChat(currentUsername, req.body.username);
    res.send(newChat);
  } catch (error) {
    if (error.message === "User does not exist.") {
      return res.status(400).send({ message: error.message });
    }
    if (error.message === "Chat already exists.") {
      return res.status(409).send({ message: error.message });
    }
  }
};

const getChat = async (req, res) => {
  const currentUsername = req.currentUsername;
  try {
    const chat = await chatService.getChat(currentUsername, req.params.chatId);
    res.send(chat);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = {
  getChats,
  createChat,
  getChat,
};
