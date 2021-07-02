import React, { useContext, useState, Fragment } from 'react';
import { FiCamera } from 'react-icons/fi';
import UploadImageTopic from '../../../components/UploadImage/UploadImageTopic';
import { EditContext } from '../../../contexts/editContext';
import edit from './BannerForm.module.css';

const BannerTopicForm = ({ collection, doc }) => {
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
        style={{ display: !editMode ? "none" : "" }}
        onClick={showEditPictureForm}
      >
        <FiCamera id="camera" />

        <UploadImageTopic
          setShowPhotoForm={setShowPhotoForm}
          showPhotoForm={showPhotoForm}
          style={photoFormStyle}
          typeValidation={['image/jpg', 'image/jpeg', 'image/png']}
          sizeValidation="3200000"
          collection={collection}
          doc={doc}
          message="The size of the image should be maximum 500KB, and the format need to be PNG, JPG."
          title='image'
        />
      </div>
    </Fragment>
  );
}

export default BannerTopicForm;
