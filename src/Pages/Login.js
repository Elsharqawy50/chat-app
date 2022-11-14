import React from "react";
import { Formik, Form } from "formik";
import Input from "components/formik/Input";
import Card from "react-bootstrap/Card";
import Button from "components/UI/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialValues ={
    email: "",
    password: ""
  };

  const onSubmit =(data)=>{
    console.log(data);
  }

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <Card style={{ width: "25rem" }} className={"px-5"}>
        <h4 className="text-center mt-3 mb-0 header fw-bold">Memo Chat</h4>
        <h6 className="text-center mt-3 mb-0 sub_header">Login</h6>
        <Card.Body>
          <Formik
          initialValues={initialValues}
          // validationSchema={addEditOperateDriver}
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
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
