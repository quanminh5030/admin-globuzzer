import React, { useState } from 'react';
import { firestore, app } from '../../utils/firebase.utils';
import { sizeTransform } from '../../utils/sizeTransform';
import edit from './UploadImage.module.css';


function UploadImageTopic({ setShowPhotoForm, showPhotoForm, style, typeValidation, sizeValidation, collection, doc, message, title }) {

  const [fileUrl, setFileUrl] = useState(null);
  const photoFormStyle = !showPhotoForm ? { display: "none" } : {};

  // on form submit, the file url is set in firestore
  const onSubmit = async (e) => {
    e.preventDefault();
    const getCollection = firestore.collection(collection);
    await getCollection.doc(doc).update({
      mainImg: fileUrl
    })
    console.log("file saved:", fileUrl)
    setShowPhotoForm(false);
  }

  // manage the upload file form + type and size validation
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if (file && typeValidation.includes(file.type)) {
      if (file.size > sizeValidation) {
        alert(`The size of the file should be maximum ${sizeTransform(sizeValidation)}, yours is ${sizeTransform(file.size)}`)
      } else {
        const fileRef = storageRef.child(`topic/${file.name}`);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
      }
    } else {
      alert(message)
    }
  }

  return (
    <div>
      <div className={edit.imageUpload} style={{ ...photoFormStyle, ...style }}>
        <div className={edit.imageContent}>
          <p className={edit.head}>{title}</p>
          <p className={edit.info}>{message}</p>
          <div className={edit.uploadBtn}>
            <form >
              <input type="file" onChange={onFileChange} name="images" />
              <button className={edit.btn}>{`Upload ${title.toLowerCase()}`}</button>
            </form>
          </div>
        </div>
        <div className={edit.command}>
          <p id="apply" onClick={onSubmit}>Apply</p>
          <p id="cancel" onClick={() => setShowPhotoForm(false)}>Cancel</p>
        </div>
      </div>
    </div>
  );
}

export default UploadImageTopic;