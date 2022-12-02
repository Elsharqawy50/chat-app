import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "components/layout/Sidebar";
import ChatContent from "components/layout/ChatContent";
import one from "images/1.jpg";
import two from "images/2.png";
import three from "images/3.jpg";
import four from "images/4.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const userData = {
  username: "John Doe",
  avatar: four,
};

const ChatsData = [
  {
    id: 1,
    username: "jone snow 1",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: three,
    isSelected: true,
    messages: [
      {
        id: 1,
        message: "Lorem ipsum",
        type: "send",
      },
      {
        id: 2,
        message: "Lorem ipsum dolor",
        type: "receive",
      },
      {
        id: 3,
        message: "Lorem ipsum dolor sit",
        type: "send",
      },
      {
        id: 4,
        message: "Lorem ipsum dolor sit amet",
        type: "receive",
      },
    ],
  },
  {
    id: 2,
    username: "jone snow 2",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: one,
    isSelected: false,
    messages: [
      {
        id: 1,
        message: "Lorem ipsum dolor sit amet",
        isSender: false,
      },
    ],
  },
  {
    id: 3,
    username: "jone snow 3",
    lastMessage: "Lorem ipsum dolor sit",
    avatar: two,
    isSelected: false,
    messages: [
      {
        id: 1,
        message: "Lorem ipsum dolor sit amet",
        isSender: false,
      },
    ],
  },
];

const Home = () => {
  const [chats, setChats] = useState([]);
  const user = useSelector((state) => state.auth.user);

  //helper function to sort array depend on date
  function compare(a, b) {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    // fetch userChats realtime
    const unsub = onSnapshot(doc(db, "userChat", user.uid), (doc) => {
      const userChats = Object.entries(doc.data()).map((chat) => {
        return {
          chatId: chat[0],
          userInfo: chat[1].userInfo,
          date: chat[1].date,
          isSelected: false,
        };
      });
      setChats(userChats.sort(compare));
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
              <ChatContent chatData={ChatsData[0]} userData={userData} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
