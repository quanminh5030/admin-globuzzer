import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import { firestore } from '../../../../utils/firebase.utils';
import { sliceData } from '../../../../utils/sliceData';
import AxiosService from '../../Service/axios/AxiosService';
import styles from './Food.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Rating from '@mui/material/Rating';
import logo from '../../../../assets/GLOBUZZER.svg';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import { VscLoading } from 'react-icons/vsc';

const Food = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  //states 
  const [coordinate, setCoordinate] = useState({ lat: '', lng: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [resSize, setResSize] = useState(6);

  useEffect(() => getData(), [])

  useEffect(() => {
    coordinate.lat && AxiosService
      .getRestaurants(coordinate.lat, coordinate.lng)
      .then(res => {
        const resList = res.data.data;
        const resHasImg = resList && resList.filter(r => r.photo)
        const resHasCuisine = resHasImg && resHasImg.filter(r => r.cuisine.length > 0)
        setRestaurants(resHasCuisine);
      })
      .catch(err => console.error(err));
  }, [coordinate])

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setCoordinate({ lat: doc.data().lat, lng: doc.data().lng })
    }
  }

  //To limit the number of restaurants displayed
  const slicedData = sliceData(restaurants, 0, resSize);

  return (
    <section className={styles.container}>
      <header className={styles.foodHeader}>
        <div>
          <BlogHeader label='Find suitable restaurants' />
        </div>
      </header>

      <div className={styles.foodFlex}>
        {restaurants.length > 0 ?
          <div className={styles.foodList}>
            {restaurants.length > 0 && slicedData.map(restaurant =>
              <Fragment key={restaurant.location_id}>
                <div
                  className={styles.foodItems}
                  onClick={() => window.open(restaurant.web_url, '_blank')}
                >
                  <div className={styles.foodPicture}>
                    <img src={restaurant.photo && restaurant.photo.images.original.url} alt={restaurant.name} />
                  </div>
                  <div>
                    <div className={styles.foodInfo}>
                      <div className={styles.basicInfo}>
                        <header>{restaurant.name}</header>
                        <div>
                          <FaMapMarkerAlt color='#5EBFBF' />
                          <span> {restaurant.address}</span>
                          <div>({Math.round(Number(restaurant.distance) * 1000)}m from the center)</div>
                        </div>
                      </div>

                      <div className={styles.rating}>
                        <div>{restaurant.rating}</div>
                        <Rating
                          name='read-only'
                          readOnly
                          precision={0.5}
                          value={Number(restaurant.rating)}
                          color='red'
                        />
                        <div>
                          {restaurant.num_reviews} reviews
                        </div>
                      </div>
                    </div>

                    <div className={styles.cuisine}>
                      {restaurant.cuisine && restaurant.cuisine.map(c =>
                        <span key={c.key}>
                          {c.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}


          </div>
          : <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
            <VscLoading style={{ fontSize: 80 }} />
          </div>
        }
        {/* for the ads */}
        <div className={styles.vimeo}>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>

      </div>

      <div className={styles.moreRes}>
        <div className={styles.resAds}>
          <div style={{ margin: 30 }}>
            Want to find and explore
            <h3 style={{ marginTop: 15 }}>Different kinds of restaurants?</h3>
          </div>

          <div onClick={() => window.open('https://globuzzer.com/', '_blank')}>
            <img src={logo} alt='globuzzer' className={styles.globuzzerLogo} />
          </div>
        </div>

        <div className={styles.moreOrLess} onClick={() => setResSize(resSize + 6)}>
          Explore more
        </div>
        {resSize > 6 &&
          <div className={styles.moreOrLess} onClick={() => setResSize(resSize - 6)}>
            Explore less
          </div>}
      </div>
    </section>
  )
}

export default Food
