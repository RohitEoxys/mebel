import React, { useState } from "react";
import { omit } from "lodash";

const useForm = (callback) => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    //A function to validate each input values

    switch (name) {
      case "username":
        if (value.length <= 3) {
          // we will set the error state

          setErrors({
            ...errors,
            username: "Username atleast have 3 letters",
          });
        } else {
          // set the error state empty or remove the error for username input

          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "username");
          setErrors((prev) => {
            return {
              ...prev,
              username: false,
            };
          });
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "number":
        if (value.length < 8) {
          setErrors({
            ...errors,
            number: "Mobile number must be minimum 8 digits",
          });
        } else if (value.length > 12) {
          setErrors({
            ...errors,
            number: "Mobile number must be maximum 12 digits",
          });
        } else {
          let newObj = omit(errors, "number");
          setErrors(newObj);
        }
        break;

      case "age":
        if (value > 150) {
          setErrors({
            ...errors,
            age: "Maximum 150 age",
          });
        } else {
          let newObj = omit(errors, "age");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);
    //Let's set these values in state

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      alert("There is an Error!");
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
