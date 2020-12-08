import React, { Fragment } from "react";
import { app } from "./../../utils/firebase.utils";
import "./FeatureBox.css";

const FeatureBox = ({ ftitle, Icon, subtitle1, subtitle2 }) => {

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name)
    fileRef.put(file).then(() => {
      console.log("Upload file", file.name);
    });
 }
  const onSubmit = (e) => {
    e.preventDefault();
  }
 
  return (
    <Fragment>
      <div className="feature-card">
        <p>{ftitle}</p>
        <hr />
        <p>{Icon}</p>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onFileChange} />
          <button>Upload Image</button>
        </form>

        <div>
          <p>{subtitle1}</p>
          <input />
        </div>
        <div>
          <p>{subtitle2}</p>
          <textarea />
        </div>
        <span>Apply</span>
        <span>Cancel</span>
      </div>
    </Fragment>
  );
};

export default FeatureBox;
