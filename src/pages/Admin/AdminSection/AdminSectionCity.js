import React, { useContext } from "react";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminSection.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import Main from "../../Section/Main";
import { EditContext } from "../../../contexts/editContext";
import useFetch from "../../../hooks/useFetch";

const AdminSectionCity = () => {
  const { city, cityId } = useParams();
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext);
  
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
              className={styles.dashboardLink}
            >
              Section Page
            </Link>
            <IoMdArrowDropright color="#F26678" size="25px"/>
            <Link 
              to={`/section/${city}/${cityId}`}
              className={styles.landingLink}
            >
              {city}
            </Link>
          </div>
          <SideNav/>
        </section>
        <section className={styles.main}>
        {!editMode ?
            (<button className={styles.editBtn} onClick={handleEditMode}>Edit it</button>) :
            (<div>
              <button className={styles.svrBtn}>Save it</button>
              <button className={styles.svrBtn} onClick={() => setEditMode(false)}>View it</button>
              <button className={styles.svrBtn}>Release it</button>
              </div>
            )
            }
            {  <Main cityId={cityId}/> }
        </section>
      </div>
    </div>
  );
};

export default AdminSectionCity;
