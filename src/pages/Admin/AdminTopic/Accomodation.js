import React, { useContext, useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import styles from './admin area/AdminTopic.module.css';
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import { EditContext } from "../../../contexts/editContext";
import MainAccomodation from "./MainAccomodation";
import { firestore } from "../../../utils/firebase.utils";

const Accomodation = () => {

  const { city, cityId } = useParams();
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext)

  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('accomodation_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [loading]);

  const releaseNewInfo = async () => {

    await firestore.collection('accomodation_live').doc('VkFL9pzz7BGkqjAYGhna').update(currentCity)

    alert('your changes are now live')
  }

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
          <SideNav iconTopic='true' />
        </section>
        <section className={styles.main}>
          {!editMode ?
            (<button className={styles.editBtn} onClick={handleEditMode}>Edit it</button>) :
            (<div>
              <button className={styles.svrBtn} onClick={() => setEditMode(false)}>Save it</button>
              <button className={styles.svrBtn} onClick={() => setEditMode(false)}>View it</button>
              <button className={styles.svrBtn} onClick={releaseNewInfo}>Release it</button>
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
