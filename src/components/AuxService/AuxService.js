import React from "react";
import "./style.css";

const AuxService = ({ logo, link, des, name }) => {
  return (
    <button type="button" className="auxservice-container">
      <a href={link}>
        <div className="aux-logo-container">
          <img src={logo} alt="logo" className="aux-logo" />
        </div>
        <div className="auxservice-bottom-container">
          <p id="find-jobs">{name}</p>
          <p className="aux-des">{des}</p>
        </div>
      </a>
    </button>
  );
};

export default AuxService;
