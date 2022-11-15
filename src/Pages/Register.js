import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Input from "components/formik/Input";
import Card from "react-bootstrap/Card";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FileInput from "components/formik/FileInput";
import UploadPhoto from "images/upload.png";

const Register = () => {
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (image && !validImageTypes.includes(image?.type)) {
      setErrorMsg("Please upload a valid image file (jpg, jpeg, png)");
    } else if (image?.size / 1000 / 1000 > 2) {
      setErrorMsg("Image size should be less than 2MB");
    } else {
      setErrorMsg("");
    }
  }, [image]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    image: "",
  };

  const onSubmit = (data) => {
    if (errorMsg) {
      return;
    }
    console.log(data);
  };

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
