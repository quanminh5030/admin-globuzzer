import React from 'react';
import styles from './Members.module.css';
import BlogHeader from '../../../components/TravelBlog/sectionHeader/SectionHeader';
import Asya from '../../../assets/Section/Members/Asya.jpg';
import Chloe from '../../../assets/Section/Members/Chloe.jpg';
import Gabriela from '../../../assets/Section/Members/Gabriela.jpg';
import Michael from '../../../assets/Section/Members/Michael.jpg';
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Members = () => {
    return (
    <div className={styles.wrapper}>
        <BlogHeader label="Top members to meet" />
        <div className={styles.grid}>
          <div className={styles.empty}/>
          <div className={styles.memberContainer}>
            <img src={Asya} alt="ava" className={styles.ava} />
            <p className={styles.name}>Asya</p>
            <p className={styles.city}>Lives in Stockholm</p>
          </div>
          <div className={styles.empty}/>
          <div className={styles.memberContainer}>
            <img src={Chloe} alt="ava" className={styles.ava} />
            <p className={styles.name}>Chloe</p>
            <p className={styles.city}>Lives in Amsterdam</p>
          </div>
          <div className={styles.flipcard}>
            <div className={styles.flipcardInner}>
              <div className={styles.flipcardFront}>
                <FiPlus className={styles.joinIcon} />
              </div>
              <button type="button" className={styles.flipcardBack}>
                <Link to="/signup" className={styles.joinAnchor}>
                  Join us
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.memberContainer}>
            <img src={Gabriela} alt="ava" className={styles.ava} />
            <p className={styles.name}>Gabriela</p>
            <p className={styles.city}>Lives in Paris</p>
          </div>
          <div />
          <div className={styles.memberContainer}>
            <img src={Michael} alt="ava" className={styles.ava} />
            <p className={styles.name}>Michael</p>
            <p className={styles.city}>Lives in Stockholm</p>
          </div>
          <div />
        </div>
    </div>
    );
}

export default Members;
