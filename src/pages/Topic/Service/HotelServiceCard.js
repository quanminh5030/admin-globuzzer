import React, { useEffect, useState } from 'react'
import styles from './FeatureCardForm.module.css'

const HotelServiceCard = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, uploadLabel, uploadDescription, title
}) => {

  const [data, setData] = useState(currentFeatureCard);
  const [currentStyle, setCurrentStyle] = useState({})


  useEffect(() => {
    setCurrentStyle(currentFeatureCard.style)
  }, [currentFeatureCard])

  const inputHandler = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const colorHandler = e => {
    const { name, value } = e.target;
    if (name === 'backgroundColor') {
      currentFeatureCard.style.backgroundColor = value;
      setCurrentStyle({ ...currentStyle, backgroundColor: value })
    } else {
      currentFeatureCard.style.buttonColor = value;
      setCurrentStyle({ ...currentStyle, buttonColor: value })
    }
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

          <div className={styles.editBox}>
            <p style={{ width: '50%' }}>Background color</p>
            <span>
              <input
                type="color"
                name="backgroundColor"
                className={styles.heading_input}
                value={currentStyle.backgroundColor}
                onChange={colorHandler}
              />
              <label>{data.style.backgroundColor}</label>
            </span>
          </div>

          <div className={styles.editBox}>
            <p style={{ width: '50%' }}>Button color</p>
            <span>
              <input
                type="color"
                name="buttonColor"
                className={styles.heading_input}
                value={currentStyle.buttonColor}
                onChange={colorHandler}
              />
              <label>{data.style.buttonColor}</label>
            </span>
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
            <p>Text 1</p>
            <input
              type="text"
              name="text1"
              className={styles.heading_input}
              value={data.text1}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Text 2</p>
            <input
              type="text"
              name="text2"
              className={styles.heading_input}
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

export default HotelServiceCard
