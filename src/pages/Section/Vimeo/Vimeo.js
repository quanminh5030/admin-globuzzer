import React from 'react';
import styles from './Vimeo.module.css';

const Vimeo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <p className={styles.title}>Vimeo</p>
                <p className={styles.caption}>Customizable Player</p>
                <p className={styles.text}>A Vimeo Feature</p>
            </div>
            <button className={styles.btn}>Learn more</button>
        </div>
    );
}

export default Vimeo;
