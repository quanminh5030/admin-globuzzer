import React, { useState, useEffect } from "react";
import Joi from "joi";
import Input from "./Input";
import user from "./userForm.module.css";

function Form2({ nextStep, prevStep }) {
  const localFormData = window.localStorage.getItem("form");
  const [savedData, setSavedData] = useState(localFormData);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [agree, setAgree] = useState(false);

  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ tlds: {} }).required(),
    phone: Joi.number().required(),
  });

  useEffect(() => {
    if (!savedData) {
      const newFormData = window.localStorage.getItem("form");
      setSavedData(newFormData);
    }
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleCheck = () => {
    setAgree(!agree);
  };

  const handleInput = ({ name, value }) => {
    if (!value) return `${name} cannot be empty`;
    if (name === "firstName" || name === "lastName") {
      if (value.length < 3) return `${name} cannot be less than 3`;
      if (value.length > 50) return `${name} cannot be more than 50`;
    }

    if (name === "email") {
      if (!value.includes("@") || !value.includes("."))
        return "Please enter a valid email";
    }

    if (name === "phone") {
      if (isNaN(phone)) return `${name} must be a number`;
    }
  };

  const onChange = ({ target: input }) => {
    const newData = { ...data };
    const errors = {};

    const errorMessage = handleInput(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    newData[input.name] = input.value;
    setData(newData);
    setError(errors);
  };

  const handleForm = () => {
    const { error } = schema.validate(data, { abortEarly: false });
    const errors = {};
    if (!error) return null;

    for (const items of error.details) {
      errors[items.path[0]] = items.message;
    }

    return errors;
  };

  const validate = () => {
    window.localStorage.setItem("form", JSON.stringify(data));
    const errors = handleForm();
    if (errors) return setError(errors);
    if (!agree) {
      if (window.innerWidth <= 700) return nextStep();
      return alert("Please agree to Privacy policy");
    }
    nextStep();
  };

  const { firstName, lastName, email, phone } = data;
  return (
    <div className={user.pageContainer}>
      <p className={user.reminder}>*yes you have to fill out these fields</p>
      <header className={user.pageHeader}>Tell us about you!</header>

      <div className={user.pageBody}>
        <Input
          className={user.formInput}
          name="firstName"
          value={firstName}
          onChange={onChange}
          error={error}
          placeholder="First name *"
        />

        <Input
          className={user.formInput}
          name="lastName"
          value={lastName}
          onChange={onChange}
          error={error}
          placeholder="Last name *"
        />

        <Input
          className={user.formInput}
          name="email"
          value={email}
          onChange={onChange}
          error={error}
          placeholder="Email *"
        />

        <Input
          className={user.formInput}
          name="phone"
          value={phone}
          onChange={onChange}
          error={error}
          placeholder="Phone number *"
        />

        {window.innerWidth > 700 && (
          <label className={user.term} onChange={handleCheck}>
            <p>I agree to the Privacy Policy and Terms of Service</p>
            <input type="checkbox" required />
            <span className={user.check}></span>
          </label>
          // <Input
          //   type="checkbox"
          //   className={user.formInput}
          //   name="check"
          //   onChange={handleCheck}
          //   label="I agree to the Privacy Policy and Terms of Service"
          // />
        )}

        <div className={`${user.continue}`}>
          <button className={`${user.btn} ${user.danger}`} onClick={validate}>
            Continue
          </button>

          <span onClick={() => prevStep()}>back</span>
        </div>
      </div>
    </div>
  );
}

export default Form2;
