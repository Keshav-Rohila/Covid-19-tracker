import numeral from 'numeral';
import React from 'react';
import {MapContainer, Popup, Circle, TileLayer } from "react-leaflet";
import "./Map.css";

function Map(props) {
  const {data, casesType, center, zoom} = props;

  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 90,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 80,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 450,
    },
  };


  return (
    <div id = "map">
      <MapContainer key={JSON.stringify(center, casesType)}
        className = "map__container" center={center} zoom={zoom} minZoom = {1} maxZoom={6} maxBounds = {[[-90,-180],   [90,180]]} scrollWheelZoom={false}>
        <TileLayer className = "map__tilelayer"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://carto.com/">carto.com</a> contributors'
        />
        {data.map((country) => (
          <Circle
          center = {[country.countryInfo.lat, country.countryInfo.long]}
          color = {casesTypeColors[casesType].hex}
          fillColor ={casesTypeColors[casesType].hex}
          fillOpacity = {0.4}
          radius = {
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
          } 
          >
          <Popup>
            <div className = "map__infoContainer">
              <div className ="map__infoFlag"
                style = {{ backgroundImage: `url(${country.countryInfo.flag})`}}
              ></div>
              <div className = "map__infoName">
                {country.country}
              </div>
              <div className = "map__infoConfirmed">
                Cases: {numeral(country.cases).format("0,0")}
              </div>
              <div className = "map__infoRecovered">
                Recovered: {numeral(country.recovered).format("0,0")}
              </div>
              <div className = "map__infoDeaths">
                Deaths: {numeral(country.deaths).format("0,0")}
              </div>
            </div>
          </Popup>
        </Circle>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map;
