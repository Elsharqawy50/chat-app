import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "components/layout/Sidebar";
import ChatContent from "components/layout/ChatContent";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const Home = () => {
  const [chats, setChats] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const chat = useSelector((state) => state.chat);

  useEffect(() => {
    // fetch userChats realtime
    const unsub = onSnapshot(doc(db, "userChat", user.uid), (doc) => {
      const userChats = Object.entries(doc.data())
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat, i) => {
          return {
            chatId: chat[0],
            userInfo: chat[1].userInfo,
            date: chat[1].date,
            isSelected: false,
            lastMessage: chat[1].lastMessage,
          };
        });
      setChats(userChats);
    });

    return () => {
      unsub();
    };
  }, [user.uid]);

  // handle selected chat
  const chatSelectedHandler = (data) => {
    setChats(data);
  };

  return (
    <div className="chat_container container d-flex justify-content-center align-items-center">
      <Card className="border-0 w-100">
        <Card.Body className="p-0 d-flex">
          <Row>
            <Col xs={4} className={"pe-0"}>
              <Sidebar chatsData={chats} onSelectChat={chatSelectedHandler} />
            </Col>
            <Col xs={8} className={"ps-0"}>
              {chat.chatId ? (
                <ChatContent />
              ) : (
                <div className="h-100 justify-content-center d-flex align-items-center">
                  <h4 className="no_choose">No Chat Selected</h4>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
