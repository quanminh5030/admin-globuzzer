import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { PricingPlanChoose } from "../PricingPlanChoose/PricingPlanChoose";
import pricingPackages from "../../../../Data/PricingPackagesData";
import axios from "axios";
import "./style.css";

const Form = ({
  setIsSubmitted,
  form,
  handleForm,
  setStartModal,
  startModal,
  handleSubmit,
}) => {
  const { name, email, subject, company, phone, city, message } = form;
  const formConditionCheck =
    name === "" || email === "" || subject === "" || company === "";
  const validation = {
    isEmailAddress(str) {
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line no-useless-escape
      return pattern.test(str);
    },
    isNotEmpty(str) {
      const pattern = /\S+/;
      return pattern.test(str);
    },
    isNumber(str) {
      const pattern = /^\d+$/;
      return pattern.test(str);
    },
    isSame(str1, str2) {
      return str1 === str2;
    },
  };
  return (
    <>
      <div className="modal_body">
        <p id="modal_body_1">* Mandatory field</p>
        <div className="pricing_input_grid">
          <input
            className="pricing_input"
            placeholder="Name *"
            type="text"
            name="name"
            value={name}
            onChange={(event) => handleForm(event)}
          />
          <input
            className="pricing_input"
            placeholder="Email *"
            type="email"
            name="email"
            value={email}
            onChange={(event) => handleForm(event)}
          />
          <input
            className="pricing_input"
            placeholder="City *"
            type="text"
            name="city"
            value={city}
            onChange={(event) => handleForm(event)}
          />

          <input
            className="pricing_input"
            placeholder="Company Name *"
            type="text"
            name="company"
            value={company}
            onChange={(event) => handleForm(event)}
          />
          <input
            className="pricing_input"
            placeholder="Phone number"
            type="text"
            name="phone"
            value={phone}
            onChange={(event) => handleForm(event)}
          />
          <input
            className="pricing_input"
            placeholder="Subject "
            type="text"
            name="subject"
            value={subject}
            onChange={(event) => handleForm(event)}
          />
        </div>
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="50"
          spellCheck
          placeholder="Message* (maximum 1000 words)"
          onChange={(event) => handleForm(event)}
          value={message}
        />
      </div>
      <div className="button_container">
        <button
          className="pricing_contact_modal_submit"
          type="button"
          onClick={() => {
            if (formConditionCheck) {
              return alert("please fill in your information");
            }
            if (!validation.isEmailAddress(email)) {
              return alert("Please put in a valid email address");
            }
            if (!validation.isNumber(phone)) {
              return alert("Please put in a valid phone number");
            }
            handleSubmit();
            setIsSubmitted(true);
          }}
        >
          Submit
        </button>
        <button
          type="button"
          className="pricing_contact_modal_close"
          onClick={() => setStartModal(!startModal)}
        >
          Close
        </button>
      </div>
    </>
  );
};
const Submitted = ({ startModal, setStartModal }) => (
  <>
    <div id="start_modal_header_1">
      <AiOutlineCheckCircle className="modal_icon" />
      Request Sent !
    </div>

    <p id="start_modal_body_2">
      Thanks for you message! <br /> We will contact you as soon as possible !
    </p>
    <button
      className="pricing_contact_modal_submit"
      type="button"
      onClick={() => {
        setStartModal(!startModal);
      }}
    >
      OK
    </button>
  </>
);
export const PricingGetStarted = ({ startModal, setStartModal, plan }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    company: "",
    phone: "",
    city: "",
    message: "",
  });
  const handleForm = (event) => {
    const newForm = { ...form, [event.target.name]: event.target.value };
    setForm(newForm);
  };

  const API_PATH = "https://staging1.globuzzer.com/phuong-2020/plan-order.php";
  const handleSubmit = (e) => {
    const formType = document.querySelector(
      ".pricing_start_modal .choose_pricing_card_type"
    ).textContent;
    const newState = { ...form };
    newState.formType = formType;
    axios({
      method: "POST",
      url: `${API_PATH}`,
      headers: { "Content-Type": "application/json" },
      data: newState,
    })
      .then((answer) => {
        console.log(answer);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const newIndex = plan + 1;
  const testPricingPackage = pricingPackages.slice(plan, newIndex);
  return (
    <Modal
      isOpen={startModal}
      className="pricing_start_modal"
      overlayClassName="pricing_start_modal_overlay"
      ariaHideApp={false}
    >
      <div className="start_left">
        <div className="start_pricing_plans_grid">
          {testPricingPackage.map((pricingPackage, index) => (
            <PricingPlanChoose key={index} pricingPackage={pricingPackage} />
          ))}
        </div>
      </div>

      <div className="start_right">
        {isSubmitted ? (
          <Submitted startModal={startModal} setStartModal={setStartModal} />
        ) : (
          <Form
            startModal={startModal}
            setStartModal={setStartModal}
            setIsSubmitted={setIsSubmitted}
            form={form}
            handleForm={handleForm}
            handleSubmit={(e) => handleSubmit(e)}
          />
        )}
      </div>
    </Modal>
  );
};
