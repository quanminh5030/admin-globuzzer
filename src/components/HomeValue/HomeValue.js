import React, { Fragment} from "react";
import "./style.css";

export const HomeValue = ({ homeData, handleShowFeature }) => {
  return (
    <Fragment>
      <div className="home_value_container content-editable">
        {homeData.map(({ icon, iconTitle, iconCaption }, index) => (
          <div className="home_value" onClick={() => handleShowFeature(index)}>
            <input
              type="image"
              src={icon}
              alt="iconic"
              className="value_img"
              width="48"
              height="48"
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
