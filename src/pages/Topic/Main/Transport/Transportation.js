import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BlogHeader from '../../../../components/TravelBlog/sectionHeader/SectionHeader';
import { EditContext, TopicPathContext } from '../../../../contexts/editContext';
import styles from './transport.module.css';
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import Amadeus from 'amadeus';
import moment from 'moment';
import Vimeo from '../../../Section/Vimeo/Vimeo';
import { sliceData } from '../../../../utils/sliceData';
import logo from '../../../../assets/GLOBUZZER.svg';
import { firestore } from '../../../../utils/firebase.utils';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios';
import { VscLoading } from 'react-icons/vsc';
import { MdCancel } from 'react-icons/md';

const Transportation = () => {
  const { cityId } = useParams();
  const topicName = useContext(TopicPathContext);
  //edit stuff
  const { editStyle, editMode } = useContext(EditContext);

  //states
  const [showList, setShowList] = useState(false);

  const [flights, setFlights] = useState([]);
  const [flightParams, setFlightParams] = useState({
    originLocationCode: 'HEL',
    destinationLocationCode: '',
    departureDate: '',
    adults: ''
  })

  const [place, setPlace] = useState('')
  const [isSearching, setIsSearching] = useState(false);

  const [otherTransports, setOtherTransports] = useState([]);

  useEffect(() => getData(), []);

  const getData = async () => {
    const doc = await firestore.collection(topicName.admin).doc(cityId).get();

    if (!doc.exists) {
      console.log('no exist');
    } else {
      setOtherTransports(doc.data().otherTransport)
    }
  }

  const [flightSize, setFlightSize] = useState(4);

  //test amadeus
  const amadeus = new Amadeus({
    clientId: 'J3wbowimCRDQf4bWzJ3xBPFibom1pyBH',
    clientSecret: 'seM2Dd1Jvw3ZAk1d'
  })

  const handleSelect = (e) => {
    setShowList(!showList);
  }

  const handleList = e => {
    setShowList(false)

    setFlightParams({...flightParams, adults: e.target.value})
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
      originLocationCode: 'HEL',
      destinationLocationCode: '',
      departureDate: '',
      adults: ''
    })
  }

  const searchFlights = () => {
    setIsSearching(true);

    amadeus.shopping.flightOffersSearch.get(flightParams)
      .then(res => {
        setFlights(res.data);
      })
      .catch(err => console.log(err))

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


      <Suspense fallback={<div></div>}>
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
      </Suspense>
      {/* for other transport */}

      <div style={{ marginTop: 120 }}>
        <BlogHeader label='Other transportation services' />

        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {otherTransports.length > 0 && otherTransports.map(other =>
            <div style={{ margin: 30 }}>
              <img src={other.image} alt={other.name} style={{ width: '100%' }} />
              <header style={{ textAlign: 'center', margin: 20 }}>{other.name}</header>
              <p>{other.description}</p>
            </div>
          )
          }
        </div>
      </div>
    </section>
  )
}

export default Transportation
