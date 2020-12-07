import React, { useState } from 'react';
import Home from '../../Home';
import SideNav from '../SideNav/SideNav';
import styles from './AdminLanding.module.css';
import {IoMdArrowDropright} from 'react-icons/io';
import {Link} from 'react-router-dom';
import TopNav from '../TopNav/TopNav';
const AdminLanding = () => {
  const [editMode, setEditMode] = useState(false);

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
            {!editMode ?
                (<button className={styles.editBtn} onClick={() => setEditMode(!editMode)}>Edit it</button>) :
                (<div>
                  <button className={styles.svrBtn} >Save it</button>
                  <button className={styles.svrBtn} >View it</button>
                  <button className={styles.svrBtn} >Release it</button>
                 </div>
                )
                }
                { editMode ? <Home contentEditable={true} editMode={editMode}/> : <Home contentEditable={false} editMode={editMode}/> }
            </section>
            </div>
        </div>
    );
}

export default AdminLanding;
