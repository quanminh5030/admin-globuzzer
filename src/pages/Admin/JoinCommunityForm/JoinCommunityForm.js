import React from 'react';
import UploadImage from '../../../components/UploadImage/UploadImage';

const JoinCommunityForm = ({ showPhotoForm, setShowPhotoForm }) => {
          
  const imageUploadStyle = {
    bottom: '-250px',
    left: '0px',
    zIndex: 100
  }

  return (
    <div>
      <UploadImage 
        showPhotoForm={showPhotoForm}
        title="Gif"
        typeValidation={["image/gif"]}
        sizeValidation="5000000"
        collection="video"
        doc="gif"
        message="The size of the gif should be maximum 5mb, and the format need to be GIF."
        style={imageUploadStyle}
        setShowPhotoForm={setShowPhotoForm}
      />
    </div>
  );
};

export default JoinCommunityForm;