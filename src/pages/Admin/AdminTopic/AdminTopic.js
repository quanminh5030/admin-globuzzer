import React from "react";
import SideNav from "../SideNav/SideNav";
import styles from '../AdminSection/AdminSection.module.css';
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";

const AdminTopic = () => {

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
      </div>
    </div>
  )
}

export default AdminTopic
