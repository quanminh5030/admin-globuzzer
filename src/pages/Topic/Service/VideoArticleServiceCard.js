import React, { useEffect, useState } from 'react'
import styles from './FeatureCardForm.module.css'

const VideoArticleServiceCard = ({
  setShow, currentFeatureCard, onFileChange, updateFeatureCard, uploadLabel, textLabel, uploadDescription, title
}) => {

  const [data, setData] = useState(currentFeatureCard);

  const [articleLink, setArticleLink] = useState('');
  const [content, setContent] = useState('');
  const [subtitle, setSubtitle] = useState('');


  useEffect(() => {
    setData(currentFeatureCard)
    if (currentFeatureCard.article) {
      setArticleLink(currentFeatureCard.article.articleLink)
      setContent(currentFeatureCard.article.content)
      setSubtitle(currentFeatureCard.article.img.title)
    }
  }, [])

  const inputHandler = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const inputHandler2 = e => {

    const { name, value } = e.target;

    name === 'content' && setContent(value);
    name === 'subtitle' && setSubtitle(value);
    name === 'articleLink' && setArticleLink(value);

    const newImg = { ...data.article.img, ['title']: subtitle }
    const newArticle = { ...data.article, [name]: value, ['img']: newImg }

    setData({ ...data, ['article']: newArticle })
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
            <p>{textLabel}</p>
            <input
              type="text"
              name="title"
              className={styles.heading_input}
              value={data.title}
              onChange={inputHandler}
            />
          </div>
          <div>
            <p>Youtube link</p>
            <input
              type="text"
              name="link"
              className={styles.heading_input}
              value={data.link}
              onChange={inputHandler}
            />
          </div>

          <div className={styles.editBox}>
            <p style={{ width: '40%' }}>Author image</p>
            <div className={styles.upload_btn_wrapper}>
              <input
                type="file"
                name="userImg"
                onChange={onFileChange}
              />
              <button className={styles.btn}>Upload image</button>
            </div>
          </div>

          <div className={styles.editBox}>
            <p style={{ width: '50%' }}>Author name</p>
            <input
              type="text"
              name="name"
              className={styles.heading_input}
              value={data.name}
              onChange={inputHandler}
            />
          </div>

          <div className={styles.editBox}>
            <p style={{ width: '50%' }}>Liked number</p>
            <input
              type="text"
              name="likes"
              className={styles.heading_input}
              value={data.likes}
              onChange={inputHandler}
            />
          </div>

          {title === 'articles' &&
            <>
              <p style={{ margin: 20 }}>Article</p>

              <div className={styles.editBox}>
                <p style={{ width: '50%' }}>Article link</p>
                <input
                  type="text"
                  name="articleLink"
                  className={styles.heading_input}
                  value={articleLink}
                  onChange={inputHandler2}
                />
              </div>

              <div className={styles.editBox}>
                <p style={{ width: '50%' }}>Content</p>
                <textarea
                  name="content"
                  className={styles.textarea_input}
                  value={content}
                  onChange={inputHandler2}
                  rows='5'
                />
              </div>


              <div className={styles.editBox}>
                <p style={{width: '40%'}}>Sub image</p>
                <div className={styles.upload_btn_wrapper}>
                  <input
                    type="file"
                    name="subImg"
                    onChange={onFileChange}
                  />
                  <button className={styles.btn}>Upload image</button>
                </div>
              </div>

              <div className={styles.editBox}>
                <p style={{ width: '50%' }}>Subtitle</p>
                <input
                  type="text"
                  name="subtitle"
                  className={styles.heading_input}
                  value={subtitle}
                  onChange={inputHandler2}
                />
              </div>
            </>
          }

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

export default VideoArticleServiceCard
