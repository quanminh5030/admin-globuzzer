import React from "react";
import styles from "./ServiceCard.module.css";
const ServiceCard = ({ card, editFeatureCard, editMode }) => {
  
  return (
    <div className={styles.card} onClick={editMode ? editFeatureCard : undefined}>
        <img src={card.image} alt='service-icon' className={styles.icon}/>
        <p className={styles.text}>{card.title}</p>
    </div>
  );
  
};

export default ServiceCard;
