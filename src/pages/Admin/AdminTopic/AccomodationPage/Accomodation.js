import React, { useEffect, useState } from 'react'
import { firestore } from '../../../../utils/firebase.utils';
import styles from './Header.module.css'
import { Navigation } from '../../../../components/Navigation/Navigation'
import '../../../../css/Home.css'

const Accomodation = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners();
  }, [])


  const getBanners = async () => {
    const doc = await firestore.collection('topic_items').doc('accomodation').get(); //hard code for the time being
    if (!doc.exists) {
      setLoading(true);
    } else {
      setBanners(doc.data().helsinki)
    }
  }

  return (
    <>
      <div
        className='section_header'
        style={{ backgroundImage: `url(${banners.banner})` }}
      >
        <Navigation />

        <div className='headers' style={{ textAlign: 'center' }}>
          <p></p>
          <p>
            {banners.title}
          </p>
          <p></p>
          <p>
            {banners.subtitle}
          </p>

          <button style={{backgroundColor: '#f24b6a', color: '#ecf0f1', borderRadius: 10, fontSize: 20, height: 60, width: 150, fontWeight: 700}}>Join us</button>
        </div>

      </div>

    </>
  )
}

export default Accomodation
