import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import useFetch from '../../../../hooks/useFetch';
import { firestore } from '../../../../utils/firebase.utils';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Health.module.css';
import MapChart from './MapChart';

const Health = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  const { items } = useFetch(topicName.admin);

  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [cityName, setCityName] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const [cities, setCities] = useState([]);

  // get list of current cities in firebase
  useEffect(() => {
    const newCitiesArr = items.length > 0 && items.map(city => ({
      name: city.city,
      cityCoor: [city.lng, city.lat]
    }))

    setCities(newCitiesArr)
  }, [items])

  // get coordinates of current city
  useEffect(() => {
    firestore.collection(topicName.admin).doc(cityId).get()
      .then(res => {
        setCoordinates({ lat: res.data().lat, lng: res.data().lng });
        setCityName(res.data().city)
      })
  }, [])

  // get list of hospitals in the selected city
  useEffect(() => {
    coordinates && AxiosService
      .getHospitals(coordinates.lat, coordinates.lng)
      .then(res => getHospitalInfo(res.data))
  }, [coordinates])

  const getHospitalInfo = hospitalList => {
    const newArr = hospitalList.length > 0 && hospitalList.map(hospital => (
      {
        name: hospital.name,
        address: hospital.address,
        coordinates: [hospital.geometry.location.lng, hospital.geometry.location.lat],
        photoRef: hospital.photos && hospital.photos[0].photo_reference
      })
    )

    setHospitals(newArr)
  }

  return (
    <section className={styles.container}>
      <header className={styles.foodHeader}>
        <div>
          <BlogHeader label='Find suitable places' />
        </div>
      </header>

      {hospitals.length > 0 &&
        <MapChart
          hospitals={hospitals}
          cityCoordinates={[coordinates.lng, coordinates.lat]}
          city={cityName}
          cities={cities}
        />
      }

      <div>
        <Vimeo cityId={cityId} collection={topicName.admin} />
      </div>
    </section>
  )
}

export default Health
