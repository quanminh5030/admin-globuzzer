import React, { Fragment, useState } from "react";
import "./style.css";

export const HomeValue = ({ homeData, handleShowFeature }) => {
  const [showEditMode, setShowEditMode] = useState(true);

  const onEditMode = () => {
    setShowEditMode(!showEditMode);
  };

  return (
    <Fragment>
      <div className="home_value_container">
        {homeData.map(({ image, title, text, id }, index) => (
          <div
            className={showEditMode ? "edit-mode-true" : "edit-mode-false"}
            onClick={onEditMode}
          >
            <div
              className="home_value "
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
