import React from "react";
import SideNav from "../SideNav/SideNav";
import styles from './AdminTopic.module.css';
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import AccomodationHelContent from "./AccomodationHelContent";

const Accomodation = () => {

  const {city, topic} = useParams();

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
            className={styles.countryLink}
          >
            Topic Page
          </Link>
          <IoMdArrowDropright color="#F26678" size="25px" />
          <Link
            to="#"
            className={styles.countryLink}
          >
            {city}
          </Link>
          <IoMdArrowDropright color="#F26678" size="25px" />
          <Link
            to={`/topic/${city}/accomodation`}
            className={styles.landingLink}
          >
            Accomodation
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.sidenav}>
          <SideNav />
        </section>
        <section className={styles.main}>
          <AccomodationHelContent />
        </section>
      </div>
    </div>
  )
}

export default Accomodation
