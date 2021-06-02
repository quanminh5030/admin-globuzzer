import React, { useContext, useEffect, useState } from "react";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminSection.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import Main from "../../Section/Main";
import { EditContext } from "../../../contexts/editContext";
import { firestore } from "../../../utils/firebase.utils";
import { readData } from "../../../utils/actions.firebase";
// import useFetch from "../../../hooks/useFetch";

const AdminSectionCity = () => {
  const { city, cityId } = useParams();
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext);
  const [currentCity, setFetchedCurrentCity] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentCity = async () => {
      const doc = await firestore.collection('section_items').doc(cityId).get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setFetchedCurrentCity(doc.data());
        setLoading(false);
      }
    };
    getCurrentCity();
  }, [cityId]);

  const releaseNewCity = async () => {
    const check = await readData('section_live', cityId);
    check
      ?
      await firestore.collection('section_live').doc(check).update(currentCity)
      :
      await firestore.collection('section_live').add({ ...currentCity, id: cityId })
    alert("your changes are now live...");
  };
  // console.log({...currentCity})
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
            to="/section"
            className={styles.dashboardLink}
          >
            Section Page
          </Link>
          <IoMdArrowDropright color="#F26678" size="25px" />
          <Link
            to={`/section/${city}/${cityId}`}
            className={styles.landingLink}
          >
            {city}
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
              <button className={styles.svrBtn} onClick={releaseNewCity}>Release it</button>
            </div>
            )
          }
          {<Main cityId={cityId} />}
        </section>
      </div>
    </div>
  );
};

export default AdminSectionCity;
