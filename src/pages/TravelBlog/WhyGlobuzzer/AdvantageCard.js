import React from 'react';
import styles from './AdvantageCard.module.css';

const AdvantageCard = ({icon, title, text}) => {
    return (
        <div className={styles.wrapper}>
            <img src={icon} alt='why-globuzzer-icon' className={styles.img}/>
            <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{text}</p>
            </div>
            
        </div>
    );
}

export default AdvantageCard;