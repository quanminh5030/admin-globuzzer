import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { TopicPathContext } from '../../../../contexts/editContext';
import styles from './Culture.module.css';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import AmadeusService from '../../Service/amadeus/AmadeusService';
import { sliceData } from '../../../../utils/sliceData';
import { ButtonGroup, Button } from 'react-bootstrap';
import { firestore } from '../../../../utils/firebase.utils';


const CultureAPI = () => {
  //params
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);

  //states
  const [activities, setActivities] = useState([]);
  const [slicedActivities, setSlicedActivities] = useState([])
  const [actSize, setActSize] = useState({
    startIndex: 0,
    endIndex: 6
  })

  //coordinate
  const [coordinate, setCoordinate] = useState({ lat: '', lng: '' })

  useEffect(() => getCoordinate(), [cityId, topicName]);

  useEffect(() => {
    coordinate.lat && AmadeusService
      .searchActivities(coordinate.lat, coordinate.lng)
      .then(res => setActivities(res.data))
      .catch(err => console.error(err))
  }, [coordinate, actSize])

  useEffect(() => {
    const slicedData = activities.length > 0 && sliceData(activities, actSize.startIndex, actSize.endIndex);

    setSlicedActivities(slicedData)
  }, [activities])

  const length = activities.length > 0 && Math.ceil(activities.length / 6)

  const getCoordinate = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();
    if (!doc.exists) {
      console.log('no data')
    } else {
      setCoordinate({ lat: doc.data().lat, lng: doc.data().lng })
    }
  }

  const btnList = () => {
    let paginationArr = [];
    for (let index = 0; index < length; index++) {
      paginationArr.push(
        <Button
          key={index} size='lg' variant='secondary'
          onClick={() => changeActivities(index)}
          className={styles.pagBtn}
        >
          {index + 1}
        </Button>
      )
    }
    return paginationArr
  }

  const changeActivities = index => {
    const newSize = ({
      startIndex: index * 6,
      endIndex: index * 6 + 6
    })
    setActSize(newSize)
  }

  return (
    <section className={styles.container}>
      <header
        className={styles.attractionHeader}
      >
        <div>
          <BlogHeader label='Find suitable activities' />
        </div>
      </header>

      <div className={styles.attractionFlex} >
        <div className={styles.attractionList}>
          {slicedActivities.length > 0 && slicedActivities.map(activity =>
            <Fragment key={activity.id}>
              <div
                className={styles.attractionItems}
              >
                <div className={styles.attractionLeft}>
                  <img src={activity.pictures} alt={activity.name} />
                  <div>
                    {`${activity.price.amount} ${activity.price.currencyCode}`}
                  </div>
                </div>

                <div className={styles.attractionRight}>
                  <div style={{ position: 'relative' }}>
                    <header>{activity.name}</header>
                  </div>

                  <p>
                    {sliceData(activity.shortDescription, 0, 201)}
                    <span> ...</span>
                  </p>

                  <button onClick={() => window.open(activity.bookingLink ? activity.bookingLink : '#')}>
                    Explore more
                  </button>
                </div>
              </div>
            </Fragment>
          )}

          <div>
            <ButtonGroup className='me-2'>
              {btnList()}
            </ButtonGroup>
          </div>

        </div>
        <div>
          <Vimeo cityId={cityId} collection={topicName.admin} />
        </div>
      </div>

    </section>
  )
}

export default CultureAPI
