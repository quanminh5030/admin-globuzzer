import React, { useContext, useEffect, useState } from 'react';
import { firestore } from '../../../utils/firebase.utils';
import { deleteWithId, readData } from '../../../utils/actions.firebase';

const DeleteVideo = (props) => {
  const { item, videos, cityId, showDeleteForm, setShowVideoForm } = props;
  const [showWarning, setShowWarning] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [videosAfter, setVideosAfter] = useState([...videos]);

  const deleteWarning = (item) => {
    setClickedCard(item);
    setVideosAfter(videosAfter.filter((video) => video.id !== item.id));
    setShowWarning(true);
    setShowVideoForm(false);
  };

  // delete selected id from both places in db - live and edit
  const onDelete = async (data) => {
    // console.log(data)
    // console.log(videosAfter)
    showDeleteForm(true);
    firestore.collection('section_items').doc(cityId).update({videos: videosAfter});
    setShowWarning(false);
    
  }
  const warningForm = (data) => {
    return (
      <div className="warningBox" style={{margin: '0 auto', position:'absolute', display:'block', left:'60px'}}>
        <div className="warningHeader">Warning</div>
        <div className="warningText">
        {`Are you sure you want to DELETE "${data.text}" video?`}
        </div>
        <div className="warningActions">
          <p onClick={() => onDelete(data)}>Yes</p>
          <p onClick={() => setShowWarning(false)}>No</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div 
        className="add_article"
        style={{backgroundColor:'#f24b6a', left: '45%', top: '16px', transform: 'rotate(45deg)'}}
        onClick={() => deleteWarning(item)}
      >
        +
      </div>
      {showWarning && item.id === clickedCard.id ? warningForm(clickedCard) : null}
    </div>
  );
};

export default DeleteVideo;