import React, { Fragment} from "react";
import "./style.css";

import HomeValueData from "./HomeValueData";

export const HomeValue = () => {
  return (
    <Fragment>
      <div className="home_value_container">
        {HomeValueData.map(({ icon, iconTitle, iconCaption }) => (
          <div className="home_value">
            <img
              src={icon}
              alt="icons"
              className="value_img"
              type="image/svg+xml"
            />

            <div>
              <p className="value_caption">{iconTitle}</p>
              <p className="value_description">{iconCaption}</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
