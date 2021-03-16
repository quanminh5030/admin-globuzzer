import React, { useState } from 'react';
import styles from './styles.module.css';

const ComunnityMembersForm = (props) => {
  const { setShowMembersForm, currentMember, updateMemberData, onFileSubmit, onFileChange } = props;
  const [data, setData] = useState(currentMember);
  
  const editMemberStyle = {
    bottom: '-283px',
    left: '489px',
    zIndex: 100
  };

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };
  
  const submitMemberData = (e) => {
    e.preventDefault();
    updateMemberData({currentMember}, data);
    onFileSubmit(data);
  }

  return (
    <div>
      <div className={styles.feature_card} style={editMemberStyle}>
      <div className={styles.feature_card_container}>
        <h4>{currentMember.name}</h4>
        <div className={styles.icon_text}>
          Image
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
            <p>Name</p>
            <input
              type="text"
              name="name"
              className={styles.title_input}
              value={data.name}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>City</p>
            <input
              type="text"
              name="city"
              className={styles.title_input}
              value={data.city}
              onChange={inputHandler}
            />
          </div>
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

export default ComunnityMembersForm;