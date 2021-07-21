import React, { useEffect, useState } from 'react'
import styles from './FeatureCardForm.module.css'

const HotelServiceCard2 = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, uploadLabel, uploadDescription, title
}) => {

  const [data, setData] = useState(currentFeatureCard);
  
  const inputHandler = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const submitFeatureCard = e => {
    console.log('submit card 2')
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
            <p>Title</p>
            <input
              type="text"
              name="title"
              className={styles.heading_input}
              value={data.title}
              onChange={inputHandler}
            />
          </div>
      
          <div>
            <p>Link</p>
            <input
              type="text"
              name="link"
              className={styles.heading_input}
              value={data.link}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Distance</p>
            <input
              type="number"
              min='0'
              name="distance"
              className={styles.heading_input}
              value={data.distance}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Price</p>
            <input
              type="number"
              min='0'
              name="price"
              className={styles.heading_input}
              value={data.price}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Rating</p>
            <input
              type="number"
              min='1' max='5'
              name="rating"
              className={styles.heading_input}
              value={data.rating}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Recommended</p>
            <input
              type="text"
              name="recommended"
              className={styles.heading_input}
              value={data.recommended}
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

export default HotelServiceCard2
