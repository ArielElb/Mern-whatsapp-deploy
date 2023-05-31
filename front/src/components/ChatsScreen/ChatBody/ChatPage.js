import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ChatController from "./ChatController";
import UserContext from "../../Users/User";
import { Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import "../../../styles/Chat.css";
import "../../../styles/Sidebar.css";
import "../../../styles/index.css";
import Logout from "../../Registration/Logout";
import { io } from "socket.io-client";

export default function ChatPage() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  const socket = io("https://backend-whatsapp.onrender.com", {
    auth: {
      username: currentUser.username,
    },
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  return (
    <div className='container d-flex align-items-center justify-content-center'>
      <Logout />
      <div className='d-flex flex-column card align-items-center card'>
        <div className='row' id='chats-row'>
          <ChatController socket={socket} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
