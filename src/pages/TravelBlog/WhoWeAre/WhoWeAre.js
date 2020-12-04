import React from 'react';
import styles from './WhoWeAre.module.css';
import Map from './Map';

const WhoWeAre = () => {
    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <p className={styles.title}>Who we are</p>
                <p className={styles.text}>
                    <span className={styles.paragraph}>Globuzzer is an award winning global network that was founded in 2006, built by a diverse community of highly skilled travel enthusiasts.</span>
                    <span className={styles.paragraph}>Our purpose is to connect and guide millions of users around the world. We host travel websites and offer the possibility to locals, expats, and travelers to share their experiences.</span>
                    <span className={styles.paragraph}>Trusted by thousands of people every year, we provide a reliable platform that offers guidance when moving to a new place or going abroad. We have everything from booking flights to reading informative destination guides and tips.</span>
                </p>
            </div>
            <div className={styles.map}>
            <Map/>  
            </div>
        </div>
        </div>
    );
}

export default WhoWeAre;
