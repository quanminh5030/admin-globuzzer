import React, { Fragment, useState, useEffect } from "react";
import { app } from "./../../utils/firebase.utils";
import "./FeatureBox.css";

const db = app.firestore();

const FeatureBox = () => {
  //state for images
  const [fileUrl, setFileUrl] = useState(null);
  //state for extracting dataInfo
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      const dataInfo = db.collection("features").get();
      setInfo(
        (await dataInfo).docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchInfo();
  }, []);

  //uploading and extracting image files
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  //submitting form
  const onSubmit = (e) => {
    e.preventDefault();
    const information = e.target.information.value;
    const textinfo = e.target.textinfo.value;
    if (!information || !textinfo) {
      return;
    }

    db.collection("features").doc(information, textinfo).set({
      image: fileUrl,
      title: information,
      text: textinfo,
    });
  };

  //updating form
  // const updateHomeValues = () => {
  //   setHomeValues(updatesHomeValue);
  // };

  return (
    <Fragment>
      <div className="feature-card">
        <h4>Feature</h4>
        <hr />
        <div className="icon-text">
          Icon
          <span>(Image has to be below 200 KB and PNG/JPG format.)</span>
        </div>

        <form onSubmit={onSubmit} className="form-wrapper">
          {/* <input type="file" onChange={onFileChange} /> */}
          <div className="upload-btn-wrapper">
            <button className="btn">Upload a file</button>
            <input type="file" onChange={onFileChange} name="images" />
          </div>

          <div>
            <p>Title</p>
            <input type="text" name="information" className="title-input" />
          </div>

          <div>
            <p>Text</p>
            <textarea name="textinfo" className="textarea-input" />
          </div>
          <div className="btn-container">
            <span>
              <button
                className="btn-apply"
                //onClick={updateHomeValues}
              >
                Apply
              </button>
            </span>
            <span>
              <button className="btn-cancel">Cancel</button>
            </span>
          </div>
        </form>
      </div>
      <div>
        {info.map((inf) => {
          return (
            <div key={inf.title}>
              <img width="100" height="100" src={inf.image} alt={inf.name} />
              <div>
                <p className="value_caption">{inf.title}</p>
                <p className="value_description">{inf.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default FeatureBox;
