import React from 'react';
import styles from './MobileCard.module.css';
import { BsHeart, BsHeartFill } from "react-icons/bs";
const Mobile = ({packagesToRender, heart}) => {
    return (
        <>
        {packagesToRender.map((item)=>(
          <div className={styles.wrapper} key={item.id}>
          <div className={styles.left}>
            <img src={item.img} alt="flag" className={styles.flag} />
            <div>
              <p className={styles.price}>{item.price}</p>
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.text}>
              <p>{item.textOne}</p>
              <p>{item.textTwo}</p>
              <p>{item.textThree}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.item}>
                <img src={item.author} alt="author" />
                <p>{item.name}</p>
              </div>
              <div className={styles.item}>
                <span onClick={() => heart(item)}>
              {item.liked ? (
                 <BsHeartFill color="#f24b6a" size="20px" />
              ) : (
                  <BsHeart color="#f24b6a" size="20px" />
              )}
            </span>
                <p>15k</p>
              </div>
              <div className={styles.item}>
                <img src={item.share} alt="share-icon" />
              </div>
            </div>
          </div>
        </div>
        ))}
        </>
    );
}

export default Mobile;
