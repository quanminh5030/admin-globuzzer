import React, { Fragment, useState, useEffect, useContext } from "react";
import "./style.css";
import { EditContext } from "../../contexts/editContext";

export const HomeValue = ({ homeData, handleShowFeature }) => {
  const [showEditMode, setShowEditMode] = useState(true);
  const { editMode } = useContext(EditContext);
  useEffect(() => {
    document.body.addEventListener("click", onEditMode);
    return () => {
      window.removeEventListener("click", onEditMode);
    };
  }, []);

  const onEditMode = () => {
    // "setShowEditMode(!showEditMode);"
    showEditMode ? setShowEditMode(false) : setShowEditMode(true);
  };

  const editedMode = () => {
    if (editMode && !showEditMode) {
      return {
        background: "#f4798933",
        borderRadius: "10px",
        border: "2px solid #f4798933",
        width: "250px",
      }
    }
    // if (!showEditMode) {
    //   return {
    //     background: "#f4798933",
    //     borderRadius: "10px",
    //     border: "2px solid #f4798933",
    //     width: "250px",
    //   };
    // } 
  };

  return (
    <Fragment>
      <div className="home_value_container">
        {homeData.map(({ image, title, text, id }, index) => (
          <div style={editedMode()}>
            <div
              className="home_value"
              onClick={() => handleShowFeature(index)}
              key={id}
            >
              <img
                src={image}
                alt="iconic"
                className="value_img"
                width="48"
                height="48"
              />
              <div>
                <p type="text" className="value_caption">
                  {title}
                </p>
                <p className="value_description">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
