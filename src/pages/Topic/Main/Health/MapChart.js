import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ hospitals, cityCoordinates, city, cities }) => {

  return (
    <ComposableMap
    // projection='geoAzimuthalEqualArea'
    // projectionConfig={{
    //   rotate: [170, 250, 300],
    //   scale: 2500
    // }}  .filter(d => d.properties.REGION_UN === 'Europe')
    >
      <Geographies geography={geoUrl}>
        {
          ({ geographies }) =>
            geographies
              .map(geo =>
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              )
        }
      </Geographies>

      {cities.map(c => {
        const isCurrentCity = c.name === city;

        return <Marker key={c.name} coordinates={c.cityCoor}>
          <circle
            r={isCurrentCity ? 7 : 2}
            fill="#F24B6A"
            stroke="#fff"
            strokeWidth={isCurrentCity ? 3 : 1}
            onClick={() => console.log(c.cityCoor)}
          />
          <text
            textAnchor="middle"
            y={-12}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: 10, fontWeight: 'bold' }}
          >
            {isCurrentCity && c.name}
          </text>
        </Marker>
      }
      )}

    </ComposableMap>
  )
}

export default MapChart
