import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MessageItem = ({ senderId, text, image, message }) => {
  const chat = useSelector((state) => state.chat);
  const user = useSelector((state) => state.auth.user);
  const dummyDevRef = useRef();

  useEffect(() => {
    dummyDevRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={dummyDevRef}
      className={`d-flex mx-3  mb-2 ${
        senderId === chat.userInfo.uid ? "receiver" : "sender"
      }`}
    >
      <img
        className="avatar"
        src={
          senderId === chat.userInfo.uid
            ? user.photoURL
            : chat.userInfo.photoURL
        }
        alt="avatar"
      />
      <div className="mx-3">
        <p className="mb-0 px-2 py-1">{text}</p>
        {image && (
          <img src={image} className="mt-2 uploaded_image" alt="message" />
        )}
      </div>
    </div>
  );
};

export default MessageItem;
