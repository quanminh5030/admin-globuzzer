import React from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import TopNav from '../TopNav/TopNav';
const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <TopNav />
      <div className={styles.container}>
        <Link to="/landing">
          <p className={styles.landing}>Landing Page</p>
        </Link>
        <Link to="/section">
          <p className={styles.section}>Section Page</p>
        </Link>
        <p className={styles.service}>Service Page</p>
        <Link to='/topic'>
          <p className={styles.topic}>Topic Page</p>
        </Link>
        <p className={styles.other}>Other Page</p>
        <p className={styles.bottom}>Bottom Area</p>
        <p className={styles.request}>Request Section</p>
      </div>
    </div>
  );
};


export default Dashboard;
