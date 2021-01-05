import React, { useContext } from 'react';
import { EditContext } from '../../../contexts/editContext';
import TextEdit from '../../../components/TextEdit/TextEdit';

const JoinCommunityForm = () => {
  const { 
    showCommunityForm, currentCommunityText, showCommunityForms
        } = useContext(EditContext);
  const formTextStyle = !showCommunityForm ? { display: "none" }
            : {
                position:'relative',
                top: '30%',
                left: '20%'
              };
  return (
    <div onClick={showCommunityForms}>
      <TextEdit currentText={currentCommunityText} formTextStyle={formTextStyle} />
    </div>
  );
};

export default JoinCommunityForm;