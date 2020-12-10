import React, { useState } from "react";
import Home from "../../Home";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminLanding.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./AdminLanding.css";
const AdminLanding = () => {
    const editContent = () => {
        document.querySelector('.editBtn').hidden = true;
       [ ...document.querySelectorAll('.content-editable')].forEach((element)=>{
           element.setAttribute('contenteditable', true);
           element.classList.add('edit-mode');
       })
    }
    return (
        <div className={styles.wrapper}>
            <TopNav/>
            <div className={styles.container}>
            <section className={styles.sidenav}>
                <div className={styles.navLink}>
                    <Link to="/dashboard" className={styles.dashboardLink}>Dashboard</Link>
                    <IoMdArrowDropright color="#F26678" size="25px"/>
                    <Link to="/landing" className={styles.landingLink}>Landing Page</Link>
                </div>
                <SideNav/>
            </section>
            <section className={styles.main}>
                <button className="editBtn" onClick={()=>editContent()}>Edit it</button>
                <Home/>
            </section>
            </div>
          </div>
  );
};

export default AdminLanding;
