import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Sidebar from "components/layout/Sidebar";
import ChatContent from "components/layout/ChatContent";

const Home = () => {
  return (
    <div className="chat_container container d-flex justify-content-center align-items-center">
      <Card className="border-0 w-100">
        <Card.Body className="p-0 d-flex">
          <Row>
            <Col xs={4} className={'pe-0'} >
              <Sidebar />
            </Col>
            <Col xs={8} className={'ps-0'} >
              <ChatContent />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
