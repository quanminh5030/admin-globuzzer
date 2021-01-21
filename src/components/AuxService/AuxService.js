import React, { useContext } from "react";
import "./style.css";
import { EditContext } from "../../contexts/editContext";

const AuxService = (props) => {
  const { editStyle, editMode } = useContext(EditContext);
  const {data} = props;
  const {link, logo, name, des} = data;
  return (
    <button type="button" className="auxservice-container content-editable" onClick={editMode ? props.editService : undefined} style={editStyle}>
     <a href={link} target="_new" style={{pointerEvents: editMode ? 'none' : undefined}}>
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
