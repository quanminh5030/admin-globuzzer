import React, { Fragment } from "react";
import "./FeatureBox.css"

const FeatureBox = ({ ftitle, Icon, Upload, subtitle1, subtitle2 }) => {
  return (
    <Fragment>
      <div className="feature-card">
        <p>{ftitle}</p>
        <hr />
        <p>{Icon}</p>
        <p>{Upload}</p>
        <div>
          <p>{subtitle1}</p>
          <input />
        </div>
        <div>
          <p>{subtitle2}</p>
          <textarea />
        </div>
        <span>
        Apply
        </span>
        <span>
          Cancel
        </span>
      </div>
    </Fragment>
  );
};

export default FeatureBox;
