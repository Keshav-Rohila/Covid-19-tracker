import React, {useState, useEffect} from 'react';
import Header from './Header';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import './App.css';
import { Card, CardContent } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 21.7679, lng: 78.8718});
  const [mapZoom, setMapZoom] = useState(3);
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, [])

  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then(response => response.json())
    .then(data => {
      const countries = data.map(country => ({
        name: country.country,
        value: country.countryInfo.iso2
      }))
      setCountries(countries);
      setMapData(data);

      const sortData = (data) => {
        const sortedData = [...data];
        sortedData.sort((a,b) => (b.cases - a.cases));
        return sortedData;
      }
      setTableData(sortData(data));
    });
    
  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    if (countryCode === "worldwide"){
      setMapZoom(2);
    }

    const url = countryCode === "worldwide" 
    ? `https://disease.sh/v3/covid-19/all` 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
      if (countryCode !== "worldwide") {
        setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long});
        setMapZoom(4);
      }
      console.log("map center ",mapCenter);
      setSelectedCountry(data.country);
    })
  }

  return (
    <div className = "app">
    <div className = "app__main">
      <div className = "app__left">
        <Header country = {country} countries = {countries} onCountryChange = {onCountryChange}/>

        <div className = "app__stats">
          <InfoBox
            onClick = {(e) => setCasesType("cases")}
            title = "Coronavirus Cases"
            cases = {countryInfo.todayCases}
            total = {countryInfo.cases}
            active = {casesType === "cases"}
            isRed
          />
          <InfoBox 
            onClick = {(e) => setCasesType("recovered")}
            title = "Recovered"
            cases = {countryInfo.todayRecovered}
            total = {countryInfo.recovered}
            active = {casesType === "recovered"}
          />
          <InfoBox 
            onClick = {(e) => setCasesType("deaths")}
            title = "Deaths"
            cases = {countryInfo.todayDeaths}
            total = {countryInfo.deaths}
            active = {casesType === "deaths"}
            isRed
          />
        </div>
        <Map 
          data = {mapData}
          casesType = {casesType}
          center = {mapCenter}
          zoom = {mapZoom}
        />
      </div>

      <div>
        <Card >
          <CardContent className = "app__right">
            <div>
              <h3>Live cases by country</h3>
              <Table data = {tableData}/>
            </div>
            <div>
              <h3>last 30 days cases {country === "worldwide"
              ? "Worldwide" : `in ${selectedCountry}`
              }</h3>
              <LineGraph casesType = {casesType} country = {country} />
            </div>
          </CardContent>
        </Card> 
      </div>
    </div> 
    <footer className = "footer">Copyright &copy; 2021 Made by Keshav Kumar Rohila</footer>  
    </div>
  );
}

export default App;
