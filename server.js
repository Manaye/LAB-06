'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const app = express();

app.use(cors());

function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
  this.temperature = data.currently.temperature;
  this.weatherSummary = data.currently.summary;
}

function convertToLatLong(data){
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = data;
  return location;
}

function weatherInfo(data) {
  const weatherData = require('./data/darksky.json');
  //currently.summary & currently.temperature
  const location = new Location(weatherData.results);
  location.search_query = data;
  return location;

}


app.get('/location',(req ,res) => {
  const locationInfo = convertToLatLong(req.query.data);
  res.send(locationInfo);
})

app.get('/weather', (req, res) =>{
  const forecast = weatherInfo(req.query.data);
  res.send(forecast);
})


app.listen(PORT, () => console.log(`App is up on ${PORT}`) );


