import React, { useState } from "react";
import Button from "components/UI/Button";
import unknown from "images/unknown.jpg";
import Search from "components/home/Search";
import ChatItem from "components/home/ChatItem";
import { useNavigate } from "react-router-dom";

const ChatsData = [
  {
    id: 1,
    username: "jone snow",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: unknown,
    isSelected: true,
  },
  {
    id: 2,
    username: "jone snow",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: unknown,
    isSelected: false,
  },
  {
    id: 3,
    username: "jone snow",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: unknown,
    isSelected: false,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(ChatsData);
  const [search, setSearch] = useState("");

  const selectChatHandler = (chat) => {
    const newChats = chats.map((c) =>
      c.id === chat.id
        ? { ...c, isSelected: true }
        : { ...c, isSelected: false }
    );
    setChats(newChats);
  };

  return (
    <>
      <div className="sidebar">
        <header className="px-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold m-0">Memo Chat</h5>
          <div className="d-flex justify-content-center align-items-center">
            <img src={unknown} alt="avatar" />
            <p className="m-0 mx-2">username</p>
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
