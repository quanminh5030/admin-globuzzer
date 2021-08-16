import React, { useState } from 'react'
import styles from './FeatureCardForm.module.css'

const NewServiceCardForm = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, uploadLabel, textLabel, uploadDescription, title
}) => {

  const [data, setData] = useState(currentFeatureCard);


  const inputHandler = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const submitFeatureCard = e => {
    console.log('submit card 2')
    setShow(false)
    e.preventDefault();
    updateFeatureCard(data)
  }

  return (
    <div className={styles.feature_card}>
      <div className={styles.feature_card_container}>
        <h4>{title.toUpperCase()}</h4>
        <div className={styles.icon_text}>
          <label>{uploadLabel}</label>
          <span> {uploadDescription}</span>
        </div>
        <div className={styles.form_wrapper}>
          <div className={styles.upload_btn_wrapper}>
            <input
              type="file"
              name="imgPath"
              onChange={onFileChange}
            />
            <button className={styles.btn} style={{ marginRight: 150 }}>Upload image</button>
          </div>
          <div>
            <p style={{ margin: 0 }}>Text</p>
            <input
              type="text"
              name="text"
              className={styles.heading_input}
              value={data.text}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p style={{ margin: 0 }}>Link</p>
            <input
              type="text"
              name="link"
              className={styles.heading_input}
              value={data.link}
              onChange={inputHandler}
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
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </span>
      </div>
    </div>

  )
}

export default NewServiceCardForm
