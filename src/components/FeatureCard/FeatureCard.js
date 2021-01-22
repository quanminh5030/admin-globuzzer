import React, { useContext } from 'react';
import { EditContext } from '../../contexts/editContext';
import styles from './FeatureCard.module.css';

const FeatureCard = ({ card, editFeatureCard }) => {
  const { editStyle, editMode } = useContext(EditContext);

  return (
    <div onClick={editMode ? editFeatureCard : undefined}>
      <div style={{...editStyle, minHeight: "300px"}} >
        <div className={styles.home_value}>
          <img 
            src={card.image} 
            alt={card.title} 
            className={styles.value_img}
          />
          <div>
            <p className={styles.value_caption}>
              {card.title}
            </p>
            <p className={styles.value_description}>{card.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;