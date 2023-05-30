const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
const Chat = require("../models/ChatModel");
const createMessage = async (currentUsername, msgToSend, chatId) => {
  const curentUser = await User.findOne({ username: currentUsername });
  const msg = new Message({
    created: Date.now(),
    sender: {
      _id: curentUser._id,
      username: curentUser.username,
      displayName: curentUser.displayName,
      profilePic: curentUser.profilePic,
    },
    content: msgToSend,
  });
  // add the message to the chat
  const chat = await Chat.findById(chatId);
  chat.messages.push(msg);
  chat.lastMessage = msg;

  await chat.save();
  await msg.save();

  msgToSend = {
    id: msg._id.toString(),
    created: msg.created,
    sender: {
      username: curentUser.username,
      displayName: curentUser.displayName,
      profilePic: curentUser.profilePic,
    },
    content: msg.content,
  };
  return msgToSend;
};

const getMessages = async (currentUsername, chatId) => {
  // find the chat
  const chat = await Chat.findById(chatId);
  // find the messages in the chat
  const messages = await Message.find({ _id: { $in: chat.messages } });
  // get the user IDs of all senders
  const senderIds = messages.map((msg) => msg.sender);

  // find the users of the senders
  const users = await User.find({ _id: { $in: senderIds } });

  // map the messages and include the sender's username
  const formattedMessages = messages.map((msg) => {
    // find the user of the sender
    const sender = users.find((user) => user._id.toString() === msg.sender.toString());
    return {
      id: msg._id,
      created: msg.created,
      sender: {
        username: sender.username,
      },
      content: msg.content,
    };
  });
  // sort the messages by date
  return formattedMessages.sort((a, b) => b.created - a.created);
};

module.exports = {
  createMessage,
  getMessages,
};
