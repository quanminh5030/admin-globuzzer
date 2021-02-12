import React from "react";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminSection.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import SectionMain from "./SectionMain"

const AdminSection = () => {

  return (
    <div className={styles.wrapper}>
      <TopNav/>
      <div className={styles.container}>
        <section className={styles.sidenav}>
          <div className={styles.navLink}>
            <Link 
              to="/dashboard" 
              className={styles.dashboardLink}
            >
              Dashboard
            </Link>
            <IoMdArrowDropright color="#F26678" size="25px"/>
            <Link 
              to="/section" 
              className={styles.landingLink}
            >
              Section Page
            </Link>
          </div>
          <SideNav/>
        </section>
        <section className={styles.main}>
          <SectionMain />
        </section>
      </div>
    </div>
  );
};

export default AdminSection;
