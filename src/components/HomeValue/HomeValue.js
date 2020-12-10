import React, { Fragment, useState } from "react";
import "./style.css";

import HomeValueData from "./HomeValueData";

export const HomeValue = ({ fileUrl }) => {
  const [images, setImages] = useState();
  const [title, setTitle] = useState();
  const [texts, setTexts] = useState();

  return (
    <Fragment>
      <div className="home_value_container">
        {HomeValueData.map(({ icon, iconTitle, iconCaption }) => (
          <div className="home_value">
            <input
              type="image"
              src={icon}
              alt="icon"
              className="value_img"
              width="48"
              height="48"
              value={fileUrl}
              onChange={(e) => setImages(e.target.value)}
            />
            <div>
              <p type="text" className="value_caption" value={iconTitle}></p>
              <p className="value_description">{iconCaption}</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
