import React, { useContext, useEffect, useState } from "react";
import Home from "../../Home";
import SideNav from "../SideNav/SideNav";
import styles from "./AdminLanding.module.css";
import { IoMdArrowDropright } from "react-icons/io";
import { Link } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import "./AdminLanding.css";
import { EditContext } from '../../../contexts/editContext';
import { firestore } from "../../../utils/firebase.utils";
import useFetch from "../../../hooks/useFetch";

const AdminLanding = () => {
  const { editMode, handleEditMode, setEditMode } = useContext(EditContext);
  const [loading, setLoading] = useState(false);
  const texts = useFetch('texts');
  const places = useFetch('places');
  const articles = useFetch('articles');
  const banners = useFetch('banners');
  const cities = useFetch('cities');
  const community = useFetch('community');
  const features = useFetch('features');
  const services = useFetch('services');
  const video = useFetch('video');
  const documents = [
    'texts', 'places', 'articles', 'banners', 'cities', 'community', 'features', 'services', 'video'
  ];
  // const addData = () => {
  //   data.items.map(async (item) => {
  //     await firestore.collection('texts_live').add(item)
  //   })
  // };
console.log(services.items)
  const updateToLive = (documents) => {
    documents.map( async (document) => {
       await firestore.collection('landing_live').doc(document).update({...document.items});
    })
  }

  const updateData = async () => {
      await firestore.collection('landing_live').doc('texts').update({...texts.items});
      await firestore.collection('landing_live').doc('places').update({...places.items});
      await firestore.collection('landing_live').doc('articles').update({...articles.items});
      await firestore.collection('landing_live').doc('banners').update({...banners.items});
      await firestore.collection('landing_live').doc('cities').update({...cities.items});
      await firestore.collection('landing_live').doc('community').update({...community.items});
      await firestore.collection('landing_live').doc('features').update({...features.items});
      await firestore.collection('landing_live').doc('services').update({...services.items});
      await firestore.collection('landing_live').doc('video').update({...video.items});
      // updateToLive(documents);
      (texts.loading || places.loading || articles.loading ||banners.loading || cities.loading || community.loading || features.loading || video.loading || services.loading) ? setLoading(true) : setLoading(false);
      alert("your changes are now live...");
  };

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
              to="/landing" 
              className={styles.landingLink}
            >
              Landing Page
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
              {!loading ? 
                <button 
                className={styles.svrBtn}
                onClick={updateData}
              >
                Release it
              </button>

              : <span>Please wait ...</span>}
              
              </div>
            )
            }
            {  <Home contentEditable={editMode ? true : false}/> }
        </section>
      </div>
    </div>
  );
};

export default AdminLanding;
