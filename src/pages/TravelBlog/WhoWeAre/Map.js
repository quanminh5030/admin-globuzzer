import React from 'react';
import './Map.css';
import { VectorMap } from "react-jvectormap";

const markers = {
    data1: [
      {
        latLng: [59.32, 18.06],
        name: "Stockholm",
        members: 2000,
      },
      {
        latLng: [60.16, 24.93],
        name: "Helsinki",
        members: 2000,
      },
      {
        latLng: [41.9, 12.49],
        name: "Rome",
        members: 3000,
      },
      {
        latLng: [59.91, 10.75],
        name: "Oslo",
        members: 4000,
      },
      {
        latLng: [55.67, 12.56],
        name: "Copenhagen",
        members: 4000,
      },
      {
        latLng: [41.38, 2.17],
        name: "Barcelona",
        members: 4000,
      },
      {
        latLng: [31.52, 74.35],
        name: "Lahore",
        members: 4000,
      },
      {
        latLng: [38.72, -9.13],
        name: "Lisbon",
        members: 4000,
      },
      {
        latLng: [43.65, -79.38],
        name: "Toronto",
        members: 4000,
      },
      {
        latLng: [51.5, 0.12],
        name: "London",
        members: 4000,
      },
      {
        latLng: [34.05, -118.24],
        name: "Los Angeles",
        members: 4000,
      },
      {
        latLng: [47.49, 19.04],
        name: "Budapest",
        members: 4000,
      },
    ],
  };
const Map = () => {
    setInterval(() => {
    const pulse = document.querySelector(".jvectormap-marker.pulse");
    const marks = Math.floor(Math.random() * 13) + 1;
    if (pulse) {
        pulse.classList.remove("pulse");
    }

    const mappy = document.querySelector(
          `.jvectormap-marker:nth-child(${marks})`
    );
    if (mappy) {
          mappy.classList.add("pulse");
    }
    }, 2000);
    
    return (
      <div id="map container">
        <VectorMap
          map={"world_mill"}
          backgroundColor="#FFFFF"
          hoverOpacity="0.7"
          series={{
            markers: [
              {
                attribute: "r",
                scale: [5],
                values: [60, 6, 54],
                normalizeFunction: "polynomial",
              },
            ],
          }}
          regionStyle={{
            initial: {
              fill: "#E5E4E5",
              cursor: "default",
            },
            hover: {
              "fill-opacity": 1,
              fill: "#99ff99",
              cursor: "pointer",
            },
            selected: {
              fill: "#ff0000",
            },
          }}
          markers={markers.data1}
          containerStyle={{
            width: "100%",
            height: "100%",
          }}
          containerClassName="map"
        />
      </div>
        
    );
}

export default Map;
