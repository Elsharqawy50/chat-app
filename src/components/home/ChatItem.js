import React from "react";

const ChatItem = ({ avatar, username, lastMessage, isSelected, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`chat_item mt-2 ps-3 ${isSelected ? "selected" : ""}`}
    >
      <div className="d-flex ">
        <img src={avatar} alt="avatar" />
        <div className="ms-3 d-flex flex-column justify-content-center">
          <h6 className="mb-0 fw-bold text-capitalize">{username}</h6>
          <p className="mb-0">{lastMessage}</p>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
