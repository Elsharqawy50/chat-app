import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "components/UI/Button";
import Sidebar from "components/layout/Sidebar";

const Home = () => {
  return (
    <div className="chat_container d-flex justify-content-center align-items-center">
      <Card className="border-0" style={{ width: "70rem" }}>
        <Card.Body className="p-0 d-flex">
          <Row>
            <Col xs={4}>
              <Sidebar />
            </Col>
            <Col xs={8}>this is a test</Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
