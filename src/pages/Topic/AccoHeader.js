import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Navigation/Navigation';
import { firestore } from '../../utils/firebase.utils';
import AccomodationTest from '../Admin/AdminTopic/AccomodationPage/AccomodationTest';
import BannerPhotoForm from '../Admin/BannerForm/SectionBannerPhotoForm'
import styles from './Header.module.css'

const AccoHeader = () => {
  const [banners, setBanners] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners();
  }, [])


  const getBanners = async () => {
    const doc = await firestore.collection('topic_items').doc('banner').get(); //hard code for the time being
    if (!doc.exists) {
      setLoading(true);
    } else {
      setBanners(doc.data().img)
    }
  }

  return (
    <>
      <div style={{}}>
        <BannerPhotoForm
          collection='topic_items'
        />
      </div>
      
      <AccomodationTest />

    </>
  )
}

export default AccoHeader
