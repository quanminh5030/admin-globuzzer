import React, { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import pricingExtraServices from "../../../../Data/PricingExtraServicesData";
import "./style.css";
import { PricingExtraService } from "../PricingExtraService/PricingExtraService";
import axios from "axios";

const Form = ({ setIsSubmitted, form, handleForm, handleSubmit }) => {
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
            placeholder="Subject"
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
      </div>
    </>
  );
};
const Submitted = ({ extraModal, setExtraModal }) => (
  <>
    <div id="start_modal_header_2">
      <AiOutlineCheckCircle className="modal_icon" />
      Request Sent !
    </div>

    <p id="start_modal_body_3">
      Thanks for you message! <br /> We will contact you as soon as possible !
    </p>
    <button
      className="pricing_contact_modal_submit"
      type="button"
      onClick={() => setExtraModal(!extraModal)}
      id="ok_button"
    >
      OK
    </button>
  </>
);
export const PricingExtraServiceChoose = ({
  extraPlan,
  setExtraModal,
  extraModal,
  setExtraPlan,
}) => {
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
  const newIndex = extraPlan + 1;
  const testPricingPackage = pricingExtraServices.slice(extraPlan, newIndex);
  const API_PATH =
    "https://staging1.globuzzer.com/phuong-2020/request-service.php";
  const handleSubmit = (e) => {
    const formType = document.querySelector(
      ".ReactModal__Content .extra_service_title"
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
  return (
    <Modal
      isOpen={extraModal}
      className="pricing_start_modal"
      overlayClassName="pricing_start_modal_overlay"
      ariaHideApp={false}
    >
      <FiX
        onClick={() => setExtraModal(!extraModal)}
        className="start_modal_close_icon"
      />
      <div className="start_left" id="start_left_choose">
        <p id="left_header_choose">Request service</p>
        <div className="start_pricing_plans_grid">
          {testPricingPackage.map((pricingPackage, index) => (
            <PricingExtraService
              key={index}
              pricingExtraService={pricingPackage}
              setExtraPlan={setExtraPlan}
              setExtraModal={setExtraModal}
              index={index}
              isRequested
            />
          ))}
        </div>
      </div>

      <div className="start_right">
        {isSubmitted ? (
          <Submitted extraModal={extraModal} setExtraModal={setExtraModal} />
        ) : (
          <Form
            extraModal={extraModal}
            setExtraModal={setExtraModal}
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
