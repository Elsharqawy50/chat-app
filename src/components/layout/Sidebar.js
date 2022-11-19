import React, { useState } from "react";
import Button from "components/UI/Button";
import Search from "components/home/Search";
import ChatItem from "components/home/ChatItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ chatData, userData,onSelectChat }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(chatData);
  const [search, setSearch] = useState("");

  const selectChatHandler = (chat) => {
    const newChats = chats.map((c) =>
      c.id === chat.id
        ? { ...c, isSelected: true }
        : { ...c, isSelected: false }
    );
    setChats(newChats);
    onSelectChat(chat.id);
  };

  return (
    <>
      <div className="sidebar">
        <header className="px-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold m-0">Memo Chat</h5>
          <div className="d-flex justify-content-center align-items-center">
            <img src={userData.avatar} alt="avatar" />
            <p className="m-0 mx-2">{userData.username}</p>
            <Button
              className={`logout px-1 py-1`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </header>
        <div className="sidebar-menu">
          <Search placeholder={"Find a user"} />
          <ul className="p-0">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                username={chat.username}
                lastMessage={chat.lastMessage}
                avatar={chat.avatar}
                isSelected={chat.isSelected}
                onClick={() => selectChatHandler(chat)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
