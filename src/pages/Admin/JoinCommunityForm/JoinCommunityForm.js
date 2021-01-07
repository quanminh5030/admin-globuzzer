import React, { useContext } from 'react';
import { EditContext } from '../../../contexts/editContext';
import TextEdit from '../../../components/TextEdit/TextEdit';

const JoinCommunityForm = () => {
  const { 
    showTextCommunityForm, currentCommunityText, textCommunityID
        } = useContext(EditContext);
        
  const formTextStyle = !showTextCommunityForm ? { display: "none" }
            : {
                top: textCommunityID === 'join_title' ? '1%' : '35%',
                left: textCommunityID === 'join_title' ? '50%' : '20%'
              };
  return (
    <div>
      <TextEdit currentText={currentCommunityText} formTextStyle={formTextStyle} />
    </div>
  );
};

export default JoinCommunityForm;