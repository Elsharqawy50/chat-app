import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faUserPlus,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "components/home/Footer";

const ChatContent = () => {
  return (
    <div className="chat_content h-100">
      <header className="px-3 d-flex justify-content-between align-items-center">
        <h6 className="fw-bold m-0">username</h6>
        <div className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon className="mx-2" icon={faVideo} />
          <FontAwesomeIcon className="mx-2" icon={faUserPlus} />
          <FontAwesomeIcon className="mx-2" icon={faEllipsis} />
        </div>
      </header>
      <main>
        <p className="m-0">
          
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default ChatContent;
