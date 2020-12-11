import React, { Fragment, useEffect, useState } from "react";
import { app } from "./../../utils/firebase.utils";
import "./FeatureBox.css";
const db = app.firestore();
const FeatureBox = ({
  info,
  setInfo,
  showFeature,
  setShowFeature,
  homeData,
  setHomeData,
}) => {
  //state for form details
  const [data, setData] = useState({
    title: "",
    body: "",
  });

  //state for image
  const [images, setImages] = useState(null);

  useEffect(() => {
    setHomeData(homeData);
    console.log("useEffect passes current item", homeData);
    // const fetchInfo = async () => {
    //   const dataInfo = await db.collection("features").get();
    //   setInfo(
    //     dataInfo.docs.map((doc) => {
    //       return doc.data();
    //     })
    //   );
    // };
    // fetchInfo();
  }, []);

  //uploading images on firestore
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImages(await fileRef.getDownloadURL());
  };

  // const imageHandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setData(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0])
  // };

  //submitting form
  // const onSubmitData = (e) => {
  //   e.preventDefault();
  //   const title = e.target.title.value;
  //   console.log(title);
  //   const body = e.target.body.value;
  //   if (!title || !body) {
  //     return;
  //   }
  //   db.collection("features").doc(title, body).set({
  //     image: images,
  //     title: title,
  //     text: body,
  //   });
  // };

  const updateHomeValue = (e) => {
    e.preventDefault();
    const newData = [...homeData];
    console.log("submit passed the id and item", homeData);
    newData[showFeature - 1].iconTitle = data.title;
    newData[showFeature - 1].icon = data.images;
    newData[showFeature - 1].iconCaption = data.body;
    setHomeData(newData);
    setShowFeature(false);

    // const title = e.target.title;
    // console.log(title);
    // const body = e.target.body;
    // if (!title || !body) {
    //   return;
    // }
    // db.collection("features").doc(newData.id).update({
    //   image: images,
    //   title: data.title,
    //   text: data.body,
    // });
  };
  const cancelUpdate = () => {
    setShowFeature(false);
  };
  const handleChange = ({ target: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };
  return (
    <Fragment>
      <div className="feature-card">
        <form className="feature-card-container">
          <h4>Feature</h4>
          <div className="icon-text">
            Icon
            <span>(Image has to be below 200 KB and PNG/JPG format)</span>
          </div>
          <div className="form-wrapper">
            <div className="upload-btn-wrapper">
            <input
              type="file"
              onChange={onFileChange}
              name="icons"
              // value={images}
              //onChange={imageHandler}
            />
            <button className="btn">Upload a file</button>
            </div>
            <div>
              <p>Title</p>
              <input
                type="text"
                name="title"
                className="title-input"
                //value={data.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Text</p>
              <textarea
                name="body"
                //value={data.body}
                onChange={handleChange}
                className="textarea-input"
              />
            </div>
          </div>
        </form>
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
        {/* <div>
        {info.map((inf) => {
          return (
            <div key={inf.title}>
              <img width="100" height="100" src={inf.images} alt={inf.name} />
              <div>
                <p className="value_caption">{inf.title}</p>
                <p className="value_description">{inf.body}</p>
              </div>
            </div>
          );
        })}
      </div> */}
      </div>
    </Fragment>
  );
};
export default FeatureBox;
