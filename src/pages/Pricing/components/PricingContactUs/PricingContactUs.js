import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "./style.css";

const Form = ({
  contactModal,
  setContactModal,
  setIsSubmitted,
  form,
  handleForm,
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
      <div className="modal_header">
        <FiX
          onClick={() => setContactModal(!contactModal)}
          className="modal_close_icon"
        />
        <p id="modal_header_1">CONTACT US</p>
        <p id="modal_header_2">
          If you have any questions, please don’t hesitate to contact us.
        </p>
      </div>
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
            type="tel"
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
          value={message}
          onChange={(event) => handleForm(event)}
          rows="4"
          cols="50"
          spellCheck
          placeholder="Message* (maximum 1000 words)"
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
const Submitted = ({ contactModal, setContactModal }) => (
  <>
    <div className="modal_header">
      <FiX
        onClick={() => setContactModal(!contactModal)}
        className="modal_close_icon"
      />
      <div id="modal_header_1">
        <AiOutlineCheckCircle className="modal_icon" />
        Message Sent !
      </div>
    </div>
    <p id="modal_body_2">
      Thanks for you message! <br /> We will contact you as soon as possible !
    </p>
    <button
      className="pricing_contact_modal_submit"
      type="button"
      onClick={() => {
        setContactModal(!contactModal);
      }}
    >
      OK
    </button>
  </>
);

export const PricingContactUs = ({ contactModal, setContactModal }) => {
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

  const handleSubmitValidation = () => {};

  const API_PATH =
    "https://staging1.globuzzer.com/phuong-2020/contact-sent.php";
  const handleForm = (event) => {
    const newForm = { ...form, [event.target.name]: event.target.value };

    setForm(newForm);
  };

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `${API_PATH}`,
      headers: { "Content-Type": "application/json" },
      data: form,
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
      isOpen={contactModal}
      className="pricing_contact_modal"
      overlayClassName="pricing_contact_modal_overlay"
      ariaHideApp={false}
    >
      {isSubmitted ? (
        <Submitted
          contactModal={contactModal}
          setContactModal={setContactModal}
        />
      ) : (
        <Form
          contactModal={contactModal}
          setContactModal={setContactModal}
          setIsSubmitted={setIsSubmitted}
          form={form}
          handleForm={(e) => handleForm(e)}
          handleSubmit={(e) => handleSubmit(e)}
        />
      )}
    </Modal>
  );
};
