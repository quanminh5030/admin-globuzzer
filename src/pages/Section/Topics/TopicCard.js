import React from "react";
import styles from './TopicCard.module.css';

const TopicCard = ({ topicsToRender }) => {
  return (
    <>
    {topicsToRender.map((topic, index)=>(
      <div className={styles.card} key={index} style={{ backgroundImage: `url(${topic.backgroundImage})` }}>
      <div className={styles.text}>
        <p className={styles.title}>{topic.title}</p>
        <p className={styles.location}>Helsinki</p>
      </div>
    </div>
    ))}
    
    </>
  );
};

export default TopicCard;
