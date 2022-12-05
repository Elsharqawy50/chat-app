import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUserPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "components/home/Footer";
import MessageItem from "components/home/MessageItem";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const chat = useSelector((state) => state.chat);
  const dummyDevRef = useRef();

  useEffect(() => {
    const timer = setTimeout(
      () => dummyDevRef.current?.scrollIntoView({ behavior: "smooth" }),
      600
    );
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    // fetch messages realtime
    const unsub = onSnapshot(doc(db, "chats", chat?.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [chat.chatId]);

  return (
    <div className="chat_content h-100">
      <header className="px-3 d-flex justify-content-between align-items-center">
        <h6 className="text-capitalize fw-bold m-0">
          {chat.userInfo.displayName}
        </h6>
        <div className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon className="mx-2" icon={faVideo} />
          <FontAwesomeIcon className="mx-2" icon={faUserPlus} />
          <FontAwesomeIcon className="mx-2" icon={faEllipsis} />
        </div>
      </header>
      <main className="py-3">
        {messages?.map((item) => (
          <MessageItem
            key={item.id}
            senderId={item.senderId}
            text={item.text}
            image={item.image}
          />
        ))}
        <div style={{ float: "left", clear: "both" }} ref={dummyDevRef}></div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatContent;
