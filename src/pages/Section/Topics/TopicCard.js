import React, { useContext } from "react";
import { EditContext } from "../../../contexts/editContext";
import styles from './TopicCard.module.css';

const TopicCard = ({ topic, openForm, currentCity }) => {
  const { editStyle, editMode } = useContext(EditContext);
  const { text, image } = topic;
  return (
    <a href={editMode ? '#' : 'https://accomodation-page.web.app/'} target='_blank'>
      <div
        className={styles.card}
        style={{ ...editStyle, backgroundImage: `url(${image})` }}
        onClick={editMode ? openForm : undefined}
      >
        <div className={styles.text}>
          <p className={styles.title}>{text}</p>
          <p className={styles.location}>{currentCity.name}</p>
        </div>

      </div>
    </a>
  );
};

export default TopicCard;
