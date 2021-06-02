import React, { useContext } from "react";
import SideNav from "../SideNav/SideNav";
import styles from './AdminTopic.module.css';
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import { EditContext } from "../../../contexts/editContext";
import MainAccomodation from "./MainAccomodation";

const Accomodation = () => {

  const { city, topic } = useParams();
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext);

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
          {!editMode ?
            (<button className={styles.editBtn} onClick={handleEditMode}>Edit it</button>) :
            (<div>
              <button className={styles.svrBtn}>Save it</button>
              <button className={styles.svrBtn} onClick={() => setEditMode(false)}>View it</button>
              <button className={styles.svrBtn} onClick={() => console.log('release')}>Release it</button>
            </div>
            )
          }

          <MainAccomodation />
        </section>
      </div>
    </div>
  )
}

export default Accomodation
