import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "components/layout/Sidebar";
import ChatContent from "components/layout/ChatContent";
import unknown from "images/unknown.jpg";
import one from "images/1.jpg";
import two from "images/2.png";
import three from "images/3.jpg";
import four from "images/4.png";

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
        type: 'send',
      },
      {
        id: 2,
        message: "Lorem ipsum dolor",
        type: 'receive',
      },
      {
        id: 3,
        message: "Lorem ipsum dolor sit",
        type: 'send',
      },
      {
        id: 4,
        message: "Lorem ipsum dolor sit amet",
        type: 'receive',
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
  const [chatData, setChatData] = useState(ChatsData[0]);

  const chatSelectedHandler = (id) => {
    const chat = ChatsData.find((chat) => chat.id === id);
    setChatData(chat);
  };

  return (
    <div className="chat_container container d-flex justify-content-center align-items-center">
      <Card className="border-0 w-100">
        <Card.Body className="p-0 d-flex">
          <Row>
            <Col xs={4} className={"pe-0"}>
              <Sidebar
                chatData={ChatsData}
                  userData={userData}
                onSelectChat={chatSelectedHandler}
              />
            </Col>
            <Col xs={8} className={"ps-0"}>
              <ChatContent chatData={chatData} userData={userData} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
