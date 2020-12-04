import React from 'react';
import styles from './Summary.module.css';
import DollarIcon from '../../../../assets/Section/Relocate/dollar-icon.svg';
import GroupIcon from '../../../../assets/Section/Relocate/group-icon.svg';
import AllInOne from '../../../../assets/Section/Relocate/all-in-one-icon.svg';

const Summary = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.container}>
          <img src={DollarIcon} alt="dollar-icon" className={styles.icon} />
          <p className={styles.text}>Save up 1000 € from your trip cost</p>
        </div>
        <div className={styles.container}>
          <img src={GroupIcon} alt="group-icon" className={styles.icon} />
          <p className={styles.text}>An Expat mate to guide you throughout your relocating process</p>
        </div>
        <div className={styles.container}>
          <img src={AllInOne} alt="all-in-one-icon" className={styles.icon} />
          <p className={styles.text}>All in one guide</p>
        </div>
      </div>
    );
}

export default Summary;
