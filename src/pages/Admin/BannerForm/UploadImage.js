import React, { useContext } from 'react';
import edit from './BannerForm.module.css';
import { EditContext } from '../../../contexts/editContext';
import { app, firestore } from '../../../utils/firebase.utils';


function UploadImage() {
  const { showPhotoForm, setShowPhotoForm, fileUrl, setFileUrl } = useContext(EditContext);
  const photoFormStyle = !showPhotoForm ? { display: "none" } : {};
  const onSubmit = (e) => {
    e.preventDefault();
    firestore.collection("banners").doc('banner').set({
      img: fileUrl
    })
  }
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    if ( file && (file.type === 'image/png' || 
        file.type === 'image/jpeg' || 
        file.type  === 'image/jpg')) {
      if (file.size > 500000) {
        alert(`your file is ${file.size / 1000}KB size, the limit is 500KB `)
        } else {
          const fileRef = storageRef.child(`banners/${file.name}`);
          await fileRef.put(file);
          setFileUrl(await fileRef.getDownloadURL());
        }
    } else {
      alert(`The size of the image should be maximum 500KB, and the format need to be PNG, JPG.`)
    }
  }

  return (
    <div>
      <div className={edit.imageUpload} style={photoFormStyle}>
      <div className={edit.imageContent}>
        <p className={edit.head}>Image</p>
        <p className={edit.info}>The size of the image should be maximum 500kb, and the format need to be PNG, JPG.</p>
        <div className={edit.uploadBtn}>
          <form >
          <input type="file" accept="image/*" onChange={onFileChange} name="images" />
          <button className={edit.btn}>Upload image</button>
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

export default UploadImage;