import React from "react";

const MessageItem = ({ senderAvatar, receiverAvatar, message, type }) => {
  return (
    <div
      className={`d-flex mx-3 align-items-center mb-2 ${
        type === "send" ? "sender" : "receiver"
      }`}
    >
      <img src={type === "send" ? senderAvatar : receiverAvatar} alt="avatar" />
      <div className="mx-3">
        <p className="mb-0 px-2 py-1">{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;
