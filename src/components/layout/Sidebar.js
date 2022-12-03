import React from "react";
import Button from "components/UI/Button";
import Search from "components/home/Search";
import ChatItem from "components/home/ChatItem";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/reducers/auth";
import { setChat } from "store/reducers/chat";

const Sidebar = ({ chatsData, onSelectChat }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
console.log(chatsData);
  const selectChatHandler = (chat) => {
    dispatch(
      setChat({
        chatId: chat.chatId,
        userInfo: chat.userInfo,
      })
    );
    const newChats = chatsData.map((c) =>
      c.chatId === chat.chatId
        ? { ...c, isSelected: true }
        : { ...c, isSelected: false }
    );
    onSelectChat(newChats);
  };

  return (
    <>
      <div className="sidebar">
        <header className="px-3 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold m-0">Memo Chat</h5>
          <div className="d-flex justify-content-center align-items-center">
            {currentUser.photoURL && (
              <>
                <img src={currentUser.photoURL} alt="avatar" />
                <p className="m-0 mx-2 text-capitalize">{currentUser.displayName}</p>
              </>
            )}
            <Button
              className={`logout px-1 py-1`}
              onClick={async () => {
                try {
                  await signOut(auth);
                  dispatch(setUser({}));
                  navigate("/login");
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              Logout
            </Button>
          </div>
        </header>
        <div className="sidebar-menu">
          <Search placeholder={"Find a user"} />
          <ul className="p-0">
            {chatsData.map((chat) => (
              <ChatItem
                key={chat.chatId}
                username={chat.userInfo.displayName}
                lastMessage={chat.lastMessage?.text}
                avatar={chat.userInfo.photoURL}
                isSelected={chat.isSelected}
                onClick={() => selectChatHandler(chat)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
