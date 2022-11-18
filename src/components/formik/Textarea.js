import React, { Fragment } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Form } from "react-bootstrap";

function Textarea({ label, name, className, ...rest }) {
  return (
    <Fragment>
      <Field name={name}>
        {({ field }) => {
          return (
            <Form.Group className={`${className}`} controlId={label}>
              {label && <Form.Label>{label}</Form.Label>}
              <Form.Control as="textarea" {...rest} {...field} />
              <ErrorMessage component={TextError} name={name} />
            </Form.Group>
          );
        }}
      </Field>
    </Fragment>
  );
}

export default Textarea;
