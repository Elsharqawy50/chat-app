import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUserPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "components/home/Footer";
import MessageItem from "components/home/MessageItem";
import { useSelector } from "react-redux";

const ChatContent = ({ chatData, userData }) => {
  const { messages } = chatData;
  const dummyDevRef = useRef();
  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    dummyDevRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat_content h-100">
      <header className="px-3 d-flex justify-content-between align-items-center">
        <h6 className="text-capitalize fw-bold m-0">{chat.userInfo.displayName}</h6>
        <div className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon className="mx-2" icon={faVideo} />
          <FontAwesomeIcon className="mx-2" icon={faUserPlus} />
          <FontAwesomeIcon className="mx-2" icon={faEllipsis} />
        </div>
      </header>
      <main className="py-3">
        {messages.map((item) => (
          <MessageItem
            key={item.id}
            senderAvatar={chatData.avatar}
            receiverAvatar={userData.avatar}
            message={item.message}
            type={item.type}
          />
        ))}
        <div style={{ float: "left", clear: "both" }} ref={dummyDevRef}></div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatContent;
