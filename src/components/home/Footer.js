import React from "react";
import Textarea from "components/formik/Textarea";
import { Formik, Form } from "formik";
import Button from "components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {

  const onSubmit = (data) => {
    console.log(data);
  };
  const initialValues = {
    message: "",
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
                className={'w-100'}
              />
              <FontAwesomeIcon className="mx-2" icon={faPaperclip} />
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
