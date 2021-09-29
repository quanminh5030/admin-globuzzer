import React, { useEffect, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from 'axios';
import { firestore } from '../../utils/firebase.utils';

const PlaceAutoComplete = ({ flightParams, setFlightParams, styles, col, doc }) => {
  const [place, setPlace] = useState('');
  const [newCity, setNewCity] = useState({
    city: '',
    IATA_code: '',
    lat: '',
    lng: '',
  })
  let cityInfo = {};

  useEffect(() => {
    (col && doc) &&
      firestore.collection(col).doc(doc).update({
        IATA_code: newCity.IATA_code,
        city: newCity.city,
        lat: newCity.lat,
        lng: newCity.lng
      })
  }, [newCity]);

  //for places autocomple
  const handleSelectPlaces = address => {
    setPlace(address)

    geocodeByAddress(address)
      .then(results => {
        cityInfo.city = results[0].address_components[0].long_name;
        return getLatLng(results[0])
      })
      .then(latLng => getIATAcode(latLng.lat, latLng.lng))
      .catch(err => console.error('error', err))
  }

  const getIATAcode = (lat, lng) => {
    axios(`https://iatageo.com/getCode/${lat}/${lng}`)
      .then(data => {
        console.log(data);
        cityInfo.IATA_code = data.data.IATA;
        cityInfo.lat = lat;
        cityInfo.lng = lng;
        if (flightParams) {
          setFlightParams({ ...flightParams, destinationLocationCode: data.data.IATA });
        } else {
          setNewCity(cityInfo)
        }
      })
      .catch(err => console.error('error', err))
  }

  return (
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
          <div className="autocomplete-dropdown-container"
            style={styles}
          >
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#f4627d', cursor: 'pointer', padding: 20 }
                : { backgroundColor: '#ffffff', cursor: 'pointer', padding: 20 };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span style={{ fontSize: 15 }}>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>

  )
}

export default PlaceAutoComplete
