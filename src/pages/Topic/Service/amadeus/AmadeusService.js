import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: 'J3wbowimCRDQf4bWzJ3xBPFibom1pyBH',
  clientSecret: 'seM2Dd1Jvw3ZAk1d'
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