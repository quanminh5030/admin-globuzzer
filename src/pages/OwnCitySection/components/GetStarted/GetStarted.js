import React, { useState } from "react";
import "./style.css";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { GetWindowDimension } from "../../../../utils/GetWindowDimension";
import OwnPackages from "../../../../Data/OwnSectionPackagesData";
import { OwnSectionPlan } from "../OwnSectionPlan/OwnSectionPlan";

const FormOne = ({ setFormOne }) => {
  const setOption = (event) => {
    setFormOne(event.target.value);
  };
  return (
    <>
      <p className="form1_title">Tell us what you want to write about *</p>
      <div
        onChange={(event) => setOption(event)}
        className="modal_radio_container"
      >
        <div className="form1_input">
          <input type="radio" value="GUIDE" name="form1" /> City Guides
        </div>
        <div className="form1_divider" />
        <div className="form1_input">
          <input type="radio" value="TRAVEL" name="form1" /> Travel Experiences
        </div>
        <div className="form1_divider" />
        <div className="form1_input">
          <input type="radio" value="TRANSFER" name="form1" /> I want to tranfer
          my travel blog to Globuzzer
        </div>
        <div className="form1_divider" />
        <div className="form1_input">
          <input type="radio" value="OTHER" name="form1" /> Other (please,
          exlain in the field below)
        </div>
        <textarea
          id="other_text_area"
          name="other_text_area"
          rows="4"
          cols="50"
          spellCheck
        />
      </div>
    </>
  );
};

const FormTwo = ({ formTwo, handleFormTwo, isAgreed, handlePolicy }) => {
  const { firstname, lastname, email, phone } = formTwo;
  return (
    <>
      <p className="form1_title">Tell us about you </p>
      <div className="form_2">
        <input
          type="text"
          placeholder="First name *"
          name="firstname"
          value={firstname}
          onChange={(event) => handleFormTwo(event)}
        />
        <input
          type="text"
          placeholder="Last name *"
          name="lastname"
          value={lastname}
          onChange={(event) => handleFormTwo(event)}
        />
        <input
          type="email"
          placeholder="Email *"
          name="email"
          value={email}
          onChange={(event) => handleFormTwo(event)}
        />
        <input
          type="number"
          placeholder="Phone number *"
          name="phone"
          value={phone}
          onChange={(event) => handleFormTwo(event)}
        />
        <div className="policy_container">
          <input
            name="isAgreed"
            type="checkbox"
            checked={isAgreed}
            onChange={(event) => handlePolicy(event)}
          />
          I agree to the Policy and Terms of Service
        </div>
      </div>
    </>
  );
};
const FormThree = ({ width }) => (
  <div className="form_3">
    {OwnPackages.map((pricingPackage, index) => (
      <OwnSectionPlan
        key={index}
        pricingPackage={pricingPackage}
        width={width}
      />
    ))}
  </div>
);
export const GetStarted = ({ modalIsOpen, setModalIsOpen }) => {
  const [formOne, setFormOne] = useState(undefined);
  const [formStage, setFormStage] = useState(0);
  const [formTwo, setFormTwo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const { width } = GetWindowDimension();

  const { firstname, lastname, email, phone } = formTwo;

  const formOneCondition = formOne === undefined;
  const formTwoCondition =
    formStage === 1 &&
    (firstname === "" ||
      lastname === "" ||
      email === "" ||
      phone === "" ||
      isAgreed === false);

  const handleFormTwo = (event) => {
    const newFormTwo = { ...formTwo, [event.target.name]: event.target.value };
    setFormTwo(newFormTwo);
  };

  const nextForm = () => {
    if (formOneCondition) {
      return alert("please select a topic");
    }
    if (formTwoCondition) {
      return alert("please fill in your information");
    }
    const nextStage = formStage + 1;
    setFormStage(nextStage);
    console.log("current stage", formStage);
  };

  const handlePolicy = (event) => {
    const { target } = event;
    const value = target.name === "isAgreed" ? target.checked : target.value;
    setIsAgreed(value);
  };
  const styles = {
    circle1: {
      backgroundColor: !formOneCondition && "white",
      color: !formOneCondition && "#f24b6a",
    },
    circle2: {
      backgroundColor: !formTwoCondition && formStage >= 1 && "white",
      color: !formTwoCondition && formStage >= 1 && "#f24b6a",
    },
    circle3: {},
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      className="upload_modal"
      overlayClassName="upload_modal_overlay"
      ariaHideApp={false}
    >
      <div className="modal_header">
        <FiX
          onClick={() => setModalIsOpen(!modalIsOpen)}
          className="modal_close_icon"
        />
        {formStage === 3 ? (
          <p id="final_thankyou">Thank you!</p>
        ) : (
          <>
            <p className="modal_title">Start your travel blog</p>
            <div className="header-progress">
              <button
                className="header-progress-circle"
                id="circle-1"
                style={styles.circle1}
                onClick={() => {
                  setFormStage(0);
                }}
                type="button"
              >
                1
              </button>
              <div className="header-progress-divider " />
              <button
                className="header-progress-circle inactive"
                id="circle-2"
                style={styles.circle2}
                onClick={() => setFormStage(1)}
                type="button"
              >
                2
              </button>
              <div className="header-progress-divider " />
              <button
                className="header-progress-circle inactive"
                id="circle-3"
                style={styles.circle3}
                onClick={() => setFormStage(2)}
                type="button"
              >
                3
              </button>
            </div>
            <div className="header-progress-description">
              <p>About your desired topic</p>
              <p>About you</p>
              <p>About your blog plan</p>
            </div>
          </>
        )}
      </div>
      {formStage !== 3 && (
        <p className="modal_required">
          * yes, you have to fill out these fields
        </p>
      )}
      {formStage === 0 && <FormOne setFormOne={setFormOne} />}
      {formStage === 1 && (
        <FormTwo
          formTwo={formTwo}
          handleFormTwo={handleFormTwo}
          isAgreed={isAgreed}
          handlePolicy={handlePolicy}
        />
      )}
      {formStage === 2 && <FormThree width={width} />}
      {formStage !== 3 && (
        <button
          type="button"
          onClick={() => nextForm()}
          className="modal_button_continue"
        >
          Continue
        </button>
      )}
      {formStage === 3 && (
        <>
          <p id="final_title">Your application has been sent!</p>
          <p id="final_des">
            Thanks for applying! We have sent you a confirmation message to your
            e-mail address. We will contact you as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => setModalIsOpen(!modalIsOpen)}
            className="final_button"
          >
            Close
          </button>
        </>
      )}
    </Modal>
  );
};
