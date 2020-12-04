import React, { useContext } from "react";
import { getStarted } from "./showGetStarted";
import user from "./userForm.module.css";

export default function Form4({ resetPage }) {
  const closeForm = useContext(getStarted);

  const endForm = () => {
    closeForm.setGetStarted(false);
    resetPage();
  };

  return (
    <div className={user.pageContainer}>
      {window.innerWidth < 700 && (
        <p className={user.smallPara}>Your application has been sent!</p>
      )}

      <p className={user.gratitudeBody}>
        We are so excited that you want to start your travel blog! We'll review
        your request and get back to you within 24hrs
      </p>

      <div className={user.end}>
        <button onClick={endForm}>Close</button>
      </div>
    </div>
  );
}
