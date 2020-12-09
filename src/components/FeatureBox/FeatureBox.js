import React, { Fragment, useState, useEffect } from "react";
import { app } from "./../../utils/firebase.utils";
import "./FeatureBox.css";

const db = app.firestore();

const FeatureBox = () => {
  //state for title and text box
  const [fileUrl, setFileUrl] = useState(null);
  //state for extracting dataInfo
  const [info, setInfo] = useState([]);

  //uploading and extracting image files
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const information = e.target.information.value;
    const textinfo = e.target.textinfo.value;
    if (!information || !textinfo) {
      return;
    }
    console.log(information);
    db.collection("features").doc(information, textinfo).set({
      image: fileUrl,
      title: information,
      text: textinfo,
    });
  };

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
  return (
    <Fragment>
      <div className="feature-card">
        <p>Feature</p>
        <hr />
        <p>Icon (Image has to be below 200 KB and PNG/JPG format.)</p>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={onFileChange} />
          <div>
            <p>Title</p>
            <input type="text" name="information" />
          </div>
          <div>
            <p>Text</p>
            <textarea name="textinfo" />
          </div>
          <span>Apply</span>
          <span>Cancel</span>
          <button>Upload Image</button>
        </form>
      </div>

      <ul>
        {info.map((inf) => {
          return (
            <li key={inf.title}>
              <img width="100" height="100" src={inf.image} alt={inf.name} />
              <p>{inf.title}</p>
              <p>{inf.text}</p>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default FeatureBox;
