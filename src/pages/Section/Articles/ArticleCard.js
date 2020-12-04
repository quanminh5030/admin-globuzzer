import React from "react";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({ articlesToRender }) => {
  return (
    <>
      {articlesToRender.map((data, index) => (
        <div className={styles.card} key={index}>
          <div
            className={styles.top}
            style={{ backgroundImage: `url(${data.img})` }}
          >
            <p className={styles.title}>{data.title}</p>
          </div>

          <div className={styles.bottom}>
            <div className={styles.author}>
              <img src={data.author} alt="author" className={styles.img} />
              <p className={styles.name}>{data.name}</p>
            </div>
            <div className={styles.likes}>
              <img
                src={data.heart}
                alt="heart-button"
                className={styles.heart}
              />
              <p className={styles.number}>{data.number}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ArticleCard;
