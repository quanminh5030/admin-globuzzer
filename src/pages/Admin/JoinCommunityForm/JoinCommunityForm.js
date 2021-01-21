import React, { useContext } from 'react';
import { EditContext } from '../../../contexts/editContext';
import TextEdit from '../../../components/TextEdit/TextEdit';
import UploadImage from '../../../components/UploadImage/UploadImage';

const JoinCommunityForm = ({ showPhotoForm, setShowPhotoForm }) => {
  const { 
    showTextCommunityForm, setShowTextCommunityForm, currentCommunityText, textCommunityID, handleSubmit
        } = useContext(EditContext);
        
  const formTextStyle = !showTextCommunityForm ? { display: "none" }
            : {
                position: '',
                top: textCommunityID === 'join_title' ? '1%' : '35%',
                left: textCommunityID === 'join_title' ? '50%' : '20%'
              };
  const imageUploadStyle = {
    bottom: '-250px',
    left: '-400px'
  }

  return (
    <div>
      <UploadImage 
        showPhotoForm={showPhotoForm}
        title="Gif"
        typeValidation="image/gif"
        sizeValidation="5000000"
        collection="video"
        doc="gif"
        message="The size of the gif should be maximum 5mb, and the format need to be GIF."
        style={imageUploadStyle}
        setShowPhotoForm={setShowPhotoForm}
      />
      <TextEdit currentText={currentCommunityText} formTextStyle={formTextStyle} showForm={setShowTextCommunityForm} save={handleSubmit('community', currentCommunityText)}/>
    </div>
  );
};

export default JoinCommunityForm;