import React, { useCallback, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "components/formik/Input";
import Card from "react-bootstrap/Card";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FileInput from "components/formik/FileInput";
import UploadPhoto from "images/upload.png";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // handle uploaded image error
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (image && !validImageTypes.includes(image?.type)) {
      setErrorMsg("Please upload a valid image file (jpg, jpeg, png)");
    } else if (image?.size / 1000 / 1000 > 2) {
      setErrorMsg("Image size should be less than 2MB");
    } else {
      setErrorMsg("");
    }
  }, [image]);

  // initial values for form fields
  const initialValues = {
    username: "",
    email: "",
    password: "",
    image: "",
  };

  // helper function to update user profile and add user to database and create his chat on database
  const updateAndAddUserData = useCallback(
    async (user, displayName, photoURL) => {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
        photoURL,
      });
      await setDoc(doc(db, "userChat", user.uid), {});
    },
    []
  );

  // submit form function
  const onSubmit = async (data) => {
    if (errorMsg) {
      return;
    }
    try {
      const respond = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // default image if user does not upload one
      const defaultImage =
        "https://firebasestorage.googleapis.com/v0/b/chat-app-d468d.appspot.com/o/unknown.jpg?alt=media&token=d253b1a5-7d07-4c81-8e36-2fc7944bd020";

      // handle if user upload photo or not
      if (data.image) {
        const storageRef = ref(storage, data.email);
        const uploadTask = uploadBytesResumable(storageRef, data.image);

        uploadTask.on(
          (error) => {
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateAndAddUserData(
                  respond.user,
                  data.username,
                  downloadURL
                );
              }
            );
          }
        );
      } else {
        await updateAndAddUserData(respond.user, data.username, defaultImage);
      }

      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      const message = error?.message;
      console.log(message);
      toast.error(
        message?.includes("email-already-in-use")
          ? "Entered email is already in use"
          : message
      );
    }
  };

  // validation for form fields
  const registerValidation = Yup.object().shape({
    username: Yup.string().required("display name is required").trim(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .trim(),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .trim(),
  });

  return (
    <div className="loginRegister d-flex justify-content-center align-items-center">
      <Card style={{ width: "25rem" }} className={"px-5"}>
        <h4 className="text-center mt-3 mb-0 header fw-bold">Memo Chat</h4>
        <h6 className="text-center mt-3 mb-0 sub_header">Register</h6>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={registerValidation}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Input
                    type="text"
                    name="username"
                    placeholder="display name"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    className={"mt-3"}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    className={"mt-3"}
                  />
                  <FileInput
                    name="image"
                    className={"mt-3"}
                    label={
                      <div className="upload d-flex justify-content-center align-items-center pt-2">
                        <img src={UploadPhoto} alt="upload" title="upload" />{" "}
                        <span className="ms-3">
                          {`Add an avatar ${image ? `(${image.name})` : ""}`}
                        </span>
                      </div>
                    }
                    errorMsg={errorMsg}
                    onChange={(event) => {
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files[0]
                      );
                      setImage(event.currentTarget.files[0]);
                    }}
                  />
                  <Button type="submit" className="mt-3 w-100">
                    Sign up
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
        <p className="text-center my-3">
          You do have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Register;
