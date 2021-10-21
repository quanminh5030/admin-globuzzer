import axios from 'axios';

const baseUrl = process.env.REACT_APP_BE_SERVER_URL;

const getRestaurants = (lat, lng) => {
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: lat,
      longitude: lng,
      limit: '30',
      currency: 'EUR',
      distance: '2',
      lunit: 'km',
      lang: 'en_US'
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    }
  };

  return axios.request(options);
}

const getPlaces = (lat, lng, type) => {
  return axios
    .get(baseUrl + '/api/getGoogleApiData', {
      params: {
        lat: lat,
        lng: lng,
        type: type,
        apiKey: process.env.REACT_APP_GOOGLEAPI_KEY
      }
    })
}

const getHospitalPhoto = photoRef => {
  return axios
    .get(baseUrl + '/api/hospitals/getPhotos', {
      params: {
        photoRef: photoRef,
        apiKey: process.env.REACT_APP_GOOGLEAPI_KEY
      }
    })
}

const AxiosService = {
  getRestaurants,
  getPlaces,
  getHospitalPhoto
}

export default AxiosService;