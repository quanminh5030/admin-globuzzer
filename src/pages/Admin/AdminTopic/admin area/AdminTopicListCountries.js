import React from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import SideNav from '../../SideNav/SideNav';
import TopNav from '../../TopNav/TopNav';
import styles from './AdminTopic.module.css';
import TopicMain from './TopicMain';

const AdminTopicListCountries = () => {

  return (
    <div className={styles.wrapper}>
      <TopNav />
      <div>
        <div className={styles.navLink}>
          <Link
            to="/dashboard"
            className={styles.dashboardLink}
          >
            Dashboard
          </Link>
          <IoMdArrowDropright color="#F26678" size="25px" />
          <Link
            to="/topic"
            className={styles.landingLink}
          >
            Topic Page
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.sidenav}>
          <SideNav />
        </section>
        <section className={styles.main}>
          <TopicMain />
        </section>
      </div>
    </div>

  )
}

export default AdminTopicListCountries
