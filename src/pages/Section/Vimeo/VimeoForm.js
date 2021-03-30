import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const VimeoForm = (props) => {
  const { setShow, currentItem, updateArticles, onFileChange } = props;
  const [data, setData] = useState(currentItem);
  
  const editMemberStyle = {
    zIndex: 100
  };

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };
  
  const submitMemberData = (e) => {
    e.preventDefault();
    updateArticles({currentItem}, data);
  }

  useEffect(() => {
    setData(currentItem);
  },[currentItem])

  return (
    <div>
      <div className={styles.feature_card} style={{...editMemberStyle, height: "545px", width: "560px"}}>
      <div className={styles.feature_card_container}>
        <h4>Advertisements</h4>
        <div className={styles.icon_text}>
          Logo
          <span>(Image has to be below 200 KB and PNG/JPG format)</span>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.upload_btn_wrapper}>
            <input 
              type="file"  
              name="coverImg"
              onChange={onFileChange}
            />
            <button className={styles.btn}>Upload image</button>
          </div>
          <div className={styles.authLikes}>
            <p>Background color</p>
            <input
              type="color"
              name="bgColor"
              className={styles.title_input}
              value={data.bgColor}
              onChange={inputHandler}
            />
            <input
              type="text"
              name="bgColor"
              className={styles.coco_input}
              value={data.bgColor}
              onChange={inputHandler}
            />
            </div>
            <div className={styles.authLikes}>
            <p>Button color</p>
            <input
              type="color"
              name="btColor"
              className={styles.title_input}
              value={data.btColor}
              onChange={inputHandler}
            />
            <input
              type="text"
              name="btColor"
              className={styles.coco_input}
              value={data.btColor}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Link</p>
            <input
              type="text"
              name="link"
              className={styles.title_input}
              value={data.link}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text1</p>
            <input
              type="text"
              name="text1"
              className={styles.title_input}
              value={data.text1}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text2</p>
            <input
              type="text"
              name="text2"
              className={styles.title_input}
              value={data.text2}
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
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  </div>
  );
};

export default VimeoForm;