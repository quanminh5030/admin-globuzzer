import React, { useEffect, useState } from 'react'
import styles from '../FeatureCardForm.module.css'

const CareerServiceCard = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, title, uploadLabel, uploadDescription, deleteTopicCard
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
            <p>Category</p>
            <input
              type="text"
              name="category"
              className={styles.title_input}
              value={data.category}
              onChange={inputHandler}
            />
          </div>

          <div>
            <p>Company name</p>
            <input
              type="text"
              name="companyName"
              className={styles.title_input}
              value={data.companyName}
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

          <div>
            <p>Expired Date</p>
            <input
              type="date"
              name="deadline"
              className={styles.title_input}
              value={data.deadline}
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

export default CareerServiceCard
