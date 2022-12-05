import React, { useState } from "react";
import Textarea from "components/formik/Textarea";
import { Formik, Form } from "formik";
import Button from "components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import FileInput from "components/formik/FileInput";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Footer = () => {
  const chat = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.user);
  const [image, setImage] = useState("");

  const onSubmit = async (data, { resetForm }) => {
    if (data.message.trim() === "") {
      return;
    }
    try {
      if (data.image) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, data.image);
        uploadTask.on(
          (error) => {
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", chat.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: data.message,
                    date: Timestamp.now(),
                    senderId: chat.userInfo.uid,
                    image: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", chat.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: data.message,
            date: Timestamp.now(),
            senderId: chat.userInfo.uid,
          }),
        });
      }
      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [chat.chatId + ".lastMessage"]: {
          text: data.message,
        },
        [chat.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChat", chat.userInfo.uid), {
        [chat.chatId + ".lastMessage"]: {
          text: data.message,
        },
        [chat.chatId + ".date"]: serverTimestamp(),
      });
      resetForm({ values: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialValues = {
    message: "",
    image: "",
  };

  return (
    <footer className="py-2">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form className="d-flex align-items-center">
              <Textarea
                row={1}
                name="message"
                placeholder="Type Something ..."
                className={"w-100"}
              />
              <FileInput
                name="image"
                label={
                  image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="upload"
                      title="upload"
                      width={30}
                      height={30}
                      className={'mx-2'}
                    />
                  ) : (
                    <FontAwesomeIcon className="mx-2" icon={faPaperclip} />
                  )
                }
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                  setImage(event.currentTarget.files[0]);
                }}
              />
              <Button className={"px-2 py-1 h-100 me-2"} type="submit">
                Send
              </Button>
            </Form>
          );
        }}
      </Formik>
    </footer>
  );
};

export default Footer;
