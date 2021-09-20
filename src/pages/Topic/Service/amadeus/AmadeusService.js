import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.REACT_APP_AMADEUS_API_KEY,
  clientSecret: process.env.REACT_APP_AMADEUS_SECRET_KEY
})

const searchFlights = flightParams => {
  return amadeus.shopping.flightOffersSearch.get(flightParams)
}

const searchActivities = (lat, lng) => {
  return amadeus.shopping.activities.get({
    latitude: lat,
    longitude: lng
  })
}

const searchHotels = (cityCode) => {
  return amadeus.shopping.hotelOffers.get({
    cityCode: cityCode
  })
}

const findHotels = (hotelParams) => {
  return amadeus.shopping.hotelOffers.get(hotelParams)
}

const AmadeusService = {
  searchFlights,
  searchActivities,
  searchHotels,
  findHotels
}

export default AmadeusService;