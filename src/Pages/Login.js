import React from "react";
import { Formik, Form } from "formik";
import Input from "components/formik/Input";
import Card from "react-bootstrap/Card";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (data) => {
    try {
      const respond = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      toast.success(`Welcome ${respond.user.displayName}`);
      navigate("/");
    } catch (error) {
      const message = error?.message;
      toast.error(
        message?.includes("wrong-password")
          ? "The password you entered is incorrect"
          : message?.includes("user-not-found")
          ? "The email address you entered is not registered"
          : message
      );
    }
  };

  const loginValidation = Yup.object().shape({
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
        <h6 className="text-center mt-3 mb-0 sub_header">Login</h6>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidation}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Input type="email" name="email" placeholder="email" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    className={"mt-3"}
                  />
                  <Button type="submit" className="mt-3 w-100">
                    Sign in
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
        <p className="text-center my-3">
          You don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
