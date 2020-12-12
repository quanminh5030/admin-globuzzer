import React, { Fragment, useEffect, useState } from "react";
import { app, firestore } from "../../utils/firebase.utils";
import "./FeatureBox.css";

const FeatureBox = ({ showFeature, setShowFeature, homeData, setHomeData }) => {
  //state for form updating data
  const [data, setData] = useState({
    title: "",
    body: "",
  });
  //state for image icons
  const [images, setImages] = useState(null);

  //Change value as user changes
  const handleChange = ({ target: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };
  //uploading images files on firestore
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImages(await fileRef.getDownloadURL());
  };

  //updating the items in firestore
  const updateItem = (id) => {
    // db.doc(`features/${id}`).update({
    firestore.collection("features").doc(id).update({
      image: images,
      title: data.title,
      text: data.body,
    });
  };

  //update information when user clicks Apply
  const updateHomeValue = () => {
    const newData = [...homeData];
    const id = newData[showFeature - 1].id;
    newData[showFeature - 1].title = data.title;
    newData[showFeature - 1].image = images;
    newData[showFeature - 1].text = data.body;
    //these are the updated values when user clicks apply
    setHomeData(newData);
    console.log("Check", newData);
    setShowFeature(false);
    //updating the id in firestore
    updateItem(id);
  };

  //cancel information when user clicks Cancel
  const cancelUpdate = () => {
    setShowFeature(false);
  };

  return (
    <Fragment>
      <div className="feature-card">
        <div className="feature-card-container">
          <h4>Feature</h4>
          <div className="icon-text">
            Icon
            <span>(Image has to be below 200 KB and PNG/JPG format)</span>
          </div>
          <div className="form-wrapper">
            <div className="upload-btn-wrapper">
              <input type="file" onChange={onFileChange} name="images" />
              <button className="btn">Upload a file</button>
            </div>
            <div>
              <p>Title</p>
              <input
                type="text"
                name="title"
                className="title-input"
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Text</p>
              <textarea
                name="body"
                onChange={handleChange}
                className="textarea-input"
              />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <span>
            <button className="btn-apply" onClick={updateHomeValue}>
              Apply
            </button>
          </span>
          <div className="vertical" />
          <span>
            <button className="btn-cancel" onClick={cancelUpdate}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    </Fragment>
  );
};
export default FeatureBox;
