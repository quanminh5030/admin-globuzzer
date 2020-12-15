import React, { useContext } from "react";
import "./style.css";
import { EditContext } from "../../contexts/editContext";

const AuxService = (props) => {
  const { editStyle } = useContext(EditContext);
  const {data} = props;
  const {link, logo, name, des} = data;
  return (
    <button type="button" className="auxservice-container content-editable" onClick={props.editService} style={editStyle}>
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
