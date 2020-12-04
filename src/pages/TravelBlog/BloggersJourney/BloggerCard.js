import React from 'react';
import styles from './BloggerCard.module.css';
import next from '../../../assets/TravelBlog/BloggersJourney/next.svg';

const BloggerCard = ({img, name, text, url}) => {
    return (
        <div className={styles.wrapper}>
            <img src={img} alt='blogger-img' className={styles.img}/>
            <div className={styles.content}>
                <p className={styles.name}>{name}</p>
                <p className={styles.text}>{text}</p>
            </div>
            <a href={url} className={styles.button}>
                
                    <p className={styles.btnText}>View section</p>
                    <img src={next} alt='next-icon' className={styles.icon}/>
                
                </a>
        </div>
    );
}

export default BloggerCard;