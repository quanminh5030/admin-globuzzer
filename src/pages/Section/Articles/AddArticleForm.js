import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const AddArticleForm = (props) => {
  const { setShow, onCoverChange, onAuthorChange, createArticle, currentArticle } = props;
  
  const [data, setData] = useState(currentArticle);
  
  const editMemberStyle = {
    bottom: '-3270px',
    left: '739px',
    zIndex: 100
  };
  const inputHandler = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]:value})
  };
  
  return (
    <div>
      <div className={styles.feature_card} style={{...editMemberStyle, height: "510px", width: "560px"}}>
      <div className={styles.feature_card_container}>
        <h4>Add new article</h4>
        <div className={styles.icon_text}>
          Cover Image
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
            <p>Link of the article</p>
            <input
              type="text"
              name="link"
              className={styles.title_input}
              value={data.link}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.icon_text}>
          <p>Author image
          <span>(Image has to be below 200 KB and PNG/JPG format)</span>
          </p>
          </div>
          <div className={styles.upload_btn_wrapper}>
            <input 
              type="file"  
              name="authImg"
              onChange={onAuthorChange}
            />
            <button className={styles.btn}>Upload image</button>
          </div>
          <div className={styles.authLikes}>
            <p>Author name</p>
            <input
              type="text"
              name="authName"
              className={styles.title_input}
              value={data.authName}
              onChange={inputHandler}
            />
            <p>Liked number</p>
            <input
              type="text"
              name="likes"
              className={styles.title_input}
              value={data.likes}
              onChange={inputHandler}
            />
          </div>
        </div>
      </div>
      <div className={styles.btn_container}>
        <span>
          <button 
            className={styles.btn_apply}
            onClick={() => createArticle(data)}
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

export default AddArticleForm;