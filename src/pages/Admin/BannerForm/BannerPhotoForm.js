import React, { useContext, useState } from 'react';
import { Fragment } from 'react';
import { FiCamera } from 'react-icons/fi';
import UploadImage from '../../../components/UploadImage/UploadImage';
import { EditContext } from '../../../contexts/editContext';
import edit from './BannerForm.module.css';

const BannerPhotoForm = ({ collection, doc}) => {
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const photoFormStyle = !showPhotoForm ? { display: "none" } : {}; 
  const { editMode } = useContext(EditContext);   
  // const editMode = true;

  const showEditPictureForm = (e) => {
    if (e.target.id === "camera") {
      e.target.style.color = "#F35270";
      setShowPhotoForm(true);
    }
  };

  return (
    <Fragment>
    <div 
      className={edit.loadPicture} 
      style={{display: !editMode ? "none" : ""}} 
      onClick={showEditPictureForm}
    >
      <FiCamera id="camera"/>
    
    <UploadImage 
      setShowPhotoForm={setShowPhotoForm}
      showPhotoForm={showPhotoForm}
      style={photoFormStyle}
      typeValidation={['image/jpg', 'image/jpeg', 'image/png']}
      sizeValidation="500000"
      collection={collection}
      doc={doc}
      message="The size of the image should be maximum 500KB, and the format need to be PNG, JPG."
      title='image'
    />
    </div>
    </Fragment>
  );
}

export default BannerPhotoForm;
