import React, { useEffect, useState } from 'react'
import styles from '../FeatureCardForm.module.css'
import "react-datepicker/dist/react-datepicker.css";

const AttractionServiceCard = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, title, uploadLabel, textLabel, uploadDescription, deleteTopicCard
}) => {

  const [data, setData] = useState(currentFeatureCard);

  useEffect(() => {
    setData(currentFeatureCard)
  }, [])

  const inputHandler = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const submitFeatureCard = e => {
    console.log('submit card 2');
    setShow(false)
    e.preventDefault();
    updateFeatureCard(data)
  }

  return (
    <div className={styles.feature_card}>
      <div className={styles.feature_card_container}>
        <h4>{title}</h4>
        <div className={styles.icon_text}>
          <label>{uploadLabel}</label>
          <span> {uploadDescription}</span>
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
            <p>{textLabel}</p>
            <input
              type="text"
              name="title"
              className={styles.title_input}
              value={data.title}
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

          <div className={styles.editBox}>
            <p>Content</p>
            <textarea
              style={{ width: '100%' }}
              rows='4'
              name='content'
              value={data.content}
              onChange={inputHandler}
            />
          </div>


          <div className={styles.editBox}>
            <button
              onClick={() => deleteTopicCard(data.id)}
            >
              Delete this card
            </button>
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
            onClick={() => {
              setShow(false)
            }
            }
          >
            Cancel
          </button>
        </span>
      </div>
    </div>
  )
}

export default AttractionServiceCard
