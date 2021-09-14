import React, { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import SideNav from '../../SideNav/SideNav';
import TopNav from '../../TopNav/TopNav';
import styles from './AdminTopic.module.css';
import TopicMain from './TopicMain';

const AdminTopicListCountries = ({ props }) => {
  const [topicSelected, setTopicSelected] = useState({ isSelected: false, topicContent: '' });

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
            className={!topicSelected.isSelected ? styles.landingLink : styles.dashboardLink}
          >
            Topic Page
          </Link>

          {topicSelected.isSelected &&
            <>
              <IoMdArrowDropright color="#F26678" size="25px" />
              <Link
                to={`/topic/${topicSelected.topicContent}`}
                className={styles.landingLink}
              >
                {topicSelected.topicContent.charAt(0).toUpperCase() + topicSelected.topicContent.slice(1)}
              </Link>
            </>
          }
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.sidenav}>
          <SideNav />
        </section>
        <section className={styles.main}>
          <TopicMain
            setTopicSelected={setTopicSelected}
            path = {props.path}
          />
        </section>
      </div>
    </div>

  )
}

export default AdminTopicListCountries
