import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import { firestore } from '../../../../utils/firebase.utils';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Health.module.css';

const Health = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' })

  useEffect(() => {
    firestore.collection(topicName.admin).doc(cityId).get()
      .then(res => setCoordinates({ lat: res.data().lat, lng: res.data().lng }))
  }, [])


  useEffect(() => {
    coordinates && AxiosService
      .getHospitals(coordinates.lat, coordinates.lng)
      // .then(res => console.log(res))
  }, [coordinates])

  return (
    <section className={styles.container}>
      <header className={styles.foodHeader}>
        <div>
          <BlogHeader label='Find suitable places' />
        </div>
      </header>
    </section>
  )
}

export default Health
