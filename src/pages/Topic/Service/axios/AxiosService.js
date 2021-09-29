import axios from 'axios';

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

const getHospitals = (lat, lng) => {
  axios
    .get('http://localhost:3001/api/hospitals', {
      params: {
        lat: lat, 
        lng: lng
      }
    })
    .then(res => console.log(res.data))
}

const AxiosService = {
  getRestaurants,
  getHospitals
}

export default AxiosService;