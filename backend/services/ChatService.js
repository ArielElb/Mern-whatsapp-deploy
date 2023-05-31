dconst Chat = require("../models/ChatModel");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
const getChats = async (username) => {
  try {
    const currentUser = await User.findOne({ username });
    const chats = await Chat.find({ users: currentUser._id }).populate("users");
    const formattedChats = [];

    for (const chat of chats) {
      // get the correct user from the users array using the username

      userToSend = chat.users[1].username == username ? chat.users[0] : chat.users[1];
      const messages = chat.messages;
      // take the last created message from the messages array
      const lastMessage = messages[messages.length - 1];

      const lastMessageSent = await Message.findById(lastMessage);
      const formattedChat = {
        id: chat.id,
        user: {
          username: userToSend.username,
          displayName: userToSend.displayName,
          profilePic: userToSend.profilePic,
        },
        lastMessage: lastMessage
          ? {
              id: lastMessageSent._id,
              content: lastMessageSent.content,
              created: lastMessageSent.created,
            }
          : null,
      };
      formattedChats.push(formattedChat);
    }
    return formattedChats.sort((a, b) => {
      // sort the chats by the last message created date in descending order (newest first)
      if (a.lastMessage && b.lastMessage) {
        return b.lastMessage.created - a.lastMessage.created;
      }
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getChat = async (username, chatId) => {
  // find the chat by id
  const chat = await Chat.findById(chatId).populate("users");
  // extract the users from the chat
  let formmatedUsers = chat.users.map((user) => {
    return {
      username: user.username,
      displayName: user.displayName,
      profilePic: user.profilePic,
    };
  });
  // find the messages in the chat
  const messages = await Message.find({ _id: { $in: chat.messages } });
  const senders = messages.map((msg) => msg.sender);
  const users = await User.find({ _id: { $in: senders } });

  let formmatedMessages = messages.map((msg) => {
    // find the user of the sender
    const sender = users.find((user) => user._id.toString() === msg.sender.toString());
    return {
      id: msg._id,
      created: msg.created,
      sender: {
        username: sender.username,
        displayName: sender.displayName,
        profilePic: sender.profilePic,
      },
      content: msg.content,
    };
  });
  return { id: chatId, users: formmatedUsers, messages: formmatedMessages };
};

const createChat = async (currentUserUserName, usernameToAdd) => {
  try {
    // Find the currentUser and usernameToAdd based on their usernames
    const currentUser = await User.findOne({ username: currentUserUserName });
    const userToAdd = await User.findOne({ username: usernameToAdd });
    if (!userToAdd) {
      throw new Error("User does not exist.");
    }
    // check if userToAdd is already in the currentUser's chat
    // get the chats
    const chats = await Chat.find({ users: currentUser._id });
    // check if the userToAdd is in any of the chats
    const chatTemp = chats.find((chat) => {
      return chat.users.includes(userToAdd._id);
    });

    if (chatTemp) {
      throw new Error("Chat already exists.");
    }

    const chat = new Chat({
      users: [userToAdd, currentUser], // Use the ObjectId values of the users
      lastMessage: null,
    });
    const formattedChat = {
      id: userToAdd.id,
      user: userToAdd,
    };
    await chat.save();
    return formattedChat;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getChats, createChat, getChat };
