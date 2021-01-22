import React, { useEffect, useState } from 'react';
import styles from './FeatureCardForm.module.css';

const FeatureCardForm = ({ setShow, currentFeatureCard, updateFeatureCard, onFileChange, onFileSubmit }) => {
  const [data, setData] = useState(currentFeatureCard);
  const position = {position: 'relative', left: '20px', bottom: '-10px'};
  useEffect(()=>{
    setData(currentFeatureCard);
    // console.log("useEffect passes current card data", currentFeatureCard);
},[currentFeatureCard]);

const inputHandler = (e) => {
  const {name, value} = e.target;
  setData({...data, [name]:value})
};

const submitFeatureCard = (e) => {
  e.preventDefault();
  updateFeatureCard({currentFeatureCard}, data);
  onFileSubmit(data);
}

  return (
    <div className={styles.feature_card} style={position}>
      <div className={styles.feature_card_container}>
        <h4>Feature</h4>
        <div className={styles.icon_text}>
          Icon
          <span>(Image has to be below 200 KB and PNG/JPG format)</span>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.upload_btn_wrapper}>
            <input 
              type="file"  
              name="image"
              onChange={onFileChange}
            />
            <button className={styles.btn}>Upload a file</button>
          </div>
          <div>
            <p>Title</p>
            <input
              type="text"
              name="title"
              className={styles.title_input}
              value={data.title}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text</p>
            <textarea
              name="text"
              className={styles.textarea_input}
              value={data.text}
              onChange={inputHandler}
              rows="4" 
              // cols="40"
            />
          </div>
        </div>
      </div>
      <div className={styles.btn_container}>
        <span>
          <button 
            className={styles.btn_apply}
            onClick={submitFeatureCard}
          >
            Apply
          </button>
        </span>
        <div className={styles.vertical} />
        <span>
          <button 
            className={styles.btn_cancel} 
            onClick={()=>setShow(false)}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
};

export default FeatureCardForm;
