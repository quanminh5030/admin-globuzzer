import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import styles from './transport.module.css';
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import moment from 'moment';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import { sliceData } from '../../../../utils/sliceData';
import logo from '../../../../assets/GLOBUZZER.svg';
import { app, firestore } from '../../../../utils/firebase.utils';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios';
import { VscLoading } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';
import TransportService from '../../Service/transportation/TransportService';
import { sizeTransform } from '../../../../utils/sizeTransform';

import AmadeusService from '../../Service/amadeus/AmadeusService';

const Transportation = () => {
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [fileUrl, setFileUrl] = useState('')

  //states
  const [showList, setShowList] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flightParams, setFlightParams] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    adults: ''
  })

  const [place, setPlace] = useState('')
  const [isSearching, setIsSearching] = useState(false);

  const [otherTransports, setOtherTransports] = useState([]);

  useEffect(() => getData(), [showEditForm]);

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setOtherTransports(doc.data().otherTransport)
      setFlightParams({ ...flightParams, originLocationCode: doc.data().IATA_code })
    }
  }

  const [flightSize, setFlightSize] = useState(4);

  const handleSelect = (e) => {
    setShowList(!showList);
  }

  const handleList = e => {
    setShowList(false)
    setFlightParams({ ...flightParams, adults: e.target.value })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFlightParams({ ...flightParams, [name]: value })
  }

  const cancelSearch = () => {
    setIsSearching(false);

    setPlace('');
    setFlights([]);

    setFlightParams({
      originLocationCode: '',
      destinationLocationCode: '',
      departureDate: '',
      adults: ''
    })
  }

  const calculateDuration = (arrival, departure) => {
    const diffTimeByMls = moment(arrival).valueOf() - moment(departure).valueOf();
    const diffTimeByMins = moment.duration(diffTimeByMls).asMinutes();
    const hoursDuration = Math.floor(diffTimeByMins / 60);
    const minutesDuration = (diffTimeByMins - hoursDuration * 60);

    return `${hoursDuration}hour ${minutesDuration}minutes`;
  }

  //to limit the number of fligh displayed
  const slicedData = sliceData(flights, 0, flightSize)

  //for places autocomple
  const handleSelectPlaces = address => {
    setPlace(address)

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => getIATAcode(latLng.lat, latLng.lng))
      .catch(err => console.error('error', err))
  }

  const getIATAcode = (lat, lng) => {
    axios(`https://iatageo.com/getCode/${lat}/${lng}`)
      .then(data => setFlightParams({ ...flightParams, destinationLocationCode: data.data.IATA }))
      .then(err => console.error('error', err))
  }

  //serch flghts
  const searchFlights = () => {
    setIsSearching(true);
    AmadeusService
      .searchFlights(flightParams)
      .then(res => setFlights(res.data))
      .catch(err => console.error(err))
  }

  //edit functions
  const openEditForm = item => {
    setShowEditForm(true);
    setCurrentCard({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      link: item.link
    })
  }

  //image handling stuff
  const typeValidation = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const sizeValidation = 200000;
  const message = (file) => {
    return `The size of the image should be maximum ${sizeTransform(sizeValidation)}, and the format need to be PNG, JPG. You tried to upload a file format: ${file.type}, size: ${sizeTransform(file.size)}`;
  }
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();

    if (file && typeValidation.includes(file.type) && file.size <= sizeValidation) {
      const fileRef = storageRef.child(`topic/${file.name}`);
      await fileRef.put(file);
      setFileUrl(await fileRef.getDownloadURL())
    } else {
      alert(message(file))
    }
  }

  const updateCard = updatedItem => {
    setShowEditForm(false);

    const updatedTransports = otherTransports.map(other => {
      return other.id === updatedItem.id ? { ...updatedItem, image: fileUrl || updatedItem.image } : other
    }
    )

    return firestore.collection(topicName.admin).doc(cityId).update({
      otherTransport: updatedTransports
    })
  }

  const onEditService = () =>
    (showEditForm && editMode) &&
    <TransportService
      title='Transport Service'
      currentFeatureCard={currentCard}
      uploadLabel='Cover image'
      uploadDescription=' (Image has to be below 200 KB and PNG/JPG format)'
      textLabel='Title'
      onFileChange={onFileChange}
      updateFeatureCard={updateCard}
      setShow={setShowEditForm}
    />

  return (
    <section className={styles.hotel}>
      <BlogHeader label='Find suitable fight' />

      <div className={styles.check}>
        <div>
          <PlacesAutocomplete
            value={place}
            onChange={text => setPlace(text)}
            onSelect={handleSelectPlaces}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Location',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container" style={{ display: 'flex', flexDirection: 'column', width: 250 }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div>
          <input type='date' placeholder='Date' value={flightParams.departureDate} name='departureDate' min={moment(new Date()).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              readOnly={true}
              value={flightParams.adults}
              onClick={handleSelect}
              name='adults'
              onChange={handleChange}
            />

            <nav style={{ height: showList && "89px" }}>
              <ul>
                <li onClick={handleList} value={1}>1</li>
                <li onClick={handleList} value={2}>2</li>
                <li onClick={handleList} value={3}>3+</li>
              </ul>
            </nav>
          </span>

          <p className={styles.formselect}>
            <IconContext.Provider
              value={{
                className: "dropIcon",
                style: { transform: showList && "rotate(180deg)" },
              }}
            >
              <TiArrowSortedDown color='white' style={{ marginTop: 10 }} />
            </IconContext.Provider>
          </p>
        </div>

        <div>
          <button onClick={searchFlights}>Search Flight</button>
        </div>

        {isSearching &&
          <div>
            <MdCancel className={styles.cancelIcon} onClick={cancelSearch} />
          </div>
        }
      </div>

      {isSearching &&
        <div className={styles.hotelflex}>
          {flights.length > 0 ?
            <div className={styles.hotelist}>
              {flights && slicedData.map(f => (
                <div className={styles.hotelitems} style={{ padding: 20 }} key={f.id}>
                  <div className={styles.flghtleft}>
                    <img src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${f.validatingAirlineCodes}`} alt={f.validatingAirlineCodes} style={{ width: '100%' }} />
                  </div>

                  <div className={styles.flightcenter}>
                    <div className={styles.time}>
                      <p>Depart</p>
                      <div>{moment(f.itineraries[0].segments[0].departure.at).format('MM/DD/YYYY')}</div>
                      <div>{moment(f.itineraries[0].segments[0].departure.at).format('hh:mm a')}</div>
                    </div>

                    <div className={styles.duration}>
                      <div>{calculateDuration(f.itineraries[0].segments[0].arrival.at, f.itineraries[0].segments[0].departure.at)}</div>

                      <div>
                        {f.itineraries[0].segments[0].numberOfStops} stops
                      </div>
                    </div>

                    <div className={styles.time}>
                      <p>Arrive</p>
                      <div>{moment(f.itineraries[0].segments[0].arrival.at).format('MM/DD/YYYY')}</div>
                      <div>{moment(f.itineraries[0].segments[0].arrival.at).format('hh:mm a')}</div>
                    </div>
                  </div>

                  <div className={styles.flightright}>
                    <span>Price</span>
                    <span className={styles.price}>{f.price.total} {f.price.currency}</span>
                  </div>
                </div>
              ))}
              <div className={styles.moreFlights}>
                <div className={styles.flightAds}>
                  <div style={{ margin: 30 }}>
                    Want to find and explore
                    <h3 style={{ marginTop: 15 }}>Different kinds of flights?</h3>
                  </div>

                  <div>
                    <img src={logo} alt='globuzzer' className={styles.globuzzerLogo} />
                  </div>
                </div>

                <div className={styles.moreOrLess} onClick={() => setFlightSize(flightSize + 4)}>
                  Explore more
                </div>
                {flightSize > 4 &&
                  <div className={styles.moreOrLess} onClick={() => setFlightSize(flightSize - 4)}>
                    Explore less
                  </div>}
              </div>
            </div>
            : <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
              <VscLoading style={{ fontSize: 80 }} />
            </div>
          }


          {/* for the ads */}
          <div>
            <Vimeo cityId={cityId} collection={topicName.admin} />
          </div>
        </div>

      }

      {/* for other transport */}

      <div style={{ marginTop: 120 }}>
        <BlogHeader label='Other transportation services' />

        <div className={styles.other}>
          {otherTransports.length > 0 && otherTransports.map(other =>
            <Fragment key={other.id}>
              <div
                style={{ ...editStyle, margin: 30 }}
                onClick={editMode ? () => openEditForm(other) : () => window.open(other.link, '_blank')}
              >
                <img src={other.image} alt={other.name} style={{ width: 300, height: 300 }} />
                <header>{other.name}</header>
                <p>{other.description}</p>
              </div>

              {showEditForm && currentCard.id == other.id &&
                <div className={styles.editBox}>
                  {onEditService()}
                </div>
              }
            </Fragment>
          )
          }
        </div>
      </div>
    </section>
  )
}

export default Transportation
