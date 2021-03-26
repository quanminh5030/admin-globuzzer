import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const VimeoForm = (props) => {
  const { setShow, currentArticle, updateArticles, onCoverChange, onAuthorChange } = props;
  const [data, setData] = useState(currentArticle);
  
  const editMemberStyle = {
    bottom: '-515px',
    left: '315px',
    zIndex: 100
  };

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };
  
  const submitMemberData = (e) => {
    e.preventDefault();
    updateArticles({currentArticle}, data);
  }

  useEffect(() => {
    setData(currentArticle);
  },[currentArticle])

  return (
    <div>
      <div className={styles.feature_card} style={{...editMemberStyle, height: "555px", width: "560px"}}>
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
              onChange={onCoverChange}
            />
            <button className={styles.btn}>Upload image</button>
          </div>
          <div className={styles.authLikes}>
            <p>Background color</p>
            <input
              type="color"
              name="authName"
              className={styles.title_input}
              // value={data.authName}
              onChange={inputHandler}
            />
            </div>
            <div className={styles.authLikes}>
            <p>Button color</p>
            <input
              type="color"
              name="likes"
              className={styles.title_input}
              // value={data.likes}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Link</p>
            <input
              type="text"
              name="link"
              className={styles.title_input}
              // value={data.title}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text1</p>
            <input
              type="text"
              name="text1"
              className={styles.title_input}
              // value={data.link}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Text2</p>
            <input
              type="text"
              name="text2"
              className={styles.title_input}
              // value={data.link}
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