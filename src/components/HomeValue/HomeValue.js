import React, { Fragment, useState } from "react";
import "./style.css";

export const HomeValue = ({ fileUrl, info, homeData, handleShowFeature }) => {
  const [images, setImages] = useState();
  const [title, setTitle] = useState();
  const [texts, setTexts] = useState();
  return (
    <Fragment>
      <div className="home_value_container">
        {homeData.map(({ icon, iconTitle, iconCaption }, index) => (
          <div className="home_value" onClick={() => handleShowFeature(index)}>
            <input
              type="image"
              src={icon}
              alt="iconic"
              className="value_img"
              width="48"
              height="48"
              //   value={fileUrl}
              //   onChange={(e) => setImages(e.target.value)}
            />
            <div>
              <p type="text" className="value_caption">
                {iconTitle}
              </p>
              <p className="value_description">{iconCaption}</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
