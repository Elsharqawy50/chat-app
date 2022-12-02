import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Search = ({ placeholder, className }) => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);

  // make request when click on enter
  const handleSearch = async (e) => {
    if (e.code === "Enter") {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", input)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleChat = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? `${currentUser.uid}${user.uid}`
        : `${user.uid}${currentUser.uid}`;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setUser(null)
    setInput('')
  };

  return (
    <div className={`search ${className} w-100`}>
      <InputGroup>
        <Form.Control
          type="text"
          className="searchInput"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSearch}
        />
      </InputGroup>
      {user && (
        <div className="mt-2 ps-3 border_gray chat_item" onClick={handleChat}>
          <div className="d-flex">
            <img src={user.photoURL} alt="avatar" />
            <div className="ms-3 d-flex flex-column justify-content-center">
              <h6 className="mb-0 fw-bold">{user.displayName}</h6>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
