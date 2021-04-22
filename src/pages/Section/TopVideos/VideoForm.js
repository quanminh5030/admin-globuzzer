import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const VideoForm = (props) => {
  const { setShowMembersForm, currentMember, updateMemberData, setShowVideoForm, onFileChange, setShowWarning, setClickedCard} = props;
  const [data, setData] = useState(currentMember);
  
  const editMemberStyle = {
    left: '888px',
    zIndex: '100',
    height: '431px'
  };

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };
  
  const submitMemberData = (e) => {
    e.preventDefault();
    updateMemberData({currentMember}, data);
  };
  useEffect(() => {
    setData(currentMember);
  }, [currentMember]);

  const deleteWarning = (item) => {
    setClickedCard(item);
    setShowWarning(true);
    setShowVideoForm(false);
  };
   
  return (
    <div>
      <div className={styles.feature_card} style={editMemberStyle}>
      <div className={styles.feature_card_container}>
        <h4>{currentMember.text}</h4>
        <div className={styles.icon_text}>
          Cover image
          <span>(Image has to be below 200 KB and PNG/JPG format)</span>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.upload_btn_wrapper}>
            <input 
              type="file"  
              name="image"
              onChange={onFileChange}
            />
            <button className={styles.btn}>Upload image</button>
          </div>
          <div>
            <p>URL</p>
            <input
              type="text"
              name="url"
              className={styles.title_input}
              value={data.url}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text</p>
            <input
              type="text"
              name="text"
              className={styles.title_input}
              value={data.text}
              onChange={inputHandler}
            />
          </div>
          <button
            onClick={() => deleteWarning(data)} 
            className={styles.editBtn}
          >
            Delete this video
          </button> 
        </div>
      </div>
      <div className={styles.btn_container}>
        <span>
          <button 
            className={styles.btn_apply}
            onClick={submitMemberData}
          >
            Apply
          </button>
        </span>
        <div className={styles.vertical} />
        <span>
          <button 
            className={styles.btn_cancel} 
            onClick={() => setShowMembersForm(false)}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  </div>
  );
};

export default VideoForm;