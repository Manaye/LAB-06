'use strict';



const express = require('express');

const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get('/location',(req ,res) => {
  const locationInfo = convertToLatLong(req.query.data);
  res.send(locationInfo);
})

function convertToLatLong(data){
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0]);
  location.search_query = data;
  return location;
}
function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;


}

// function searchToLatLong(query) {
//   // Go to google (tomorrow)
//   const geoData = require('./data/geo.json');
//   const location = new Location(geoData.results[0]);
// 	location.search_query = query;
//   return location;
// }

// function Location(data) {
//   this.formatted_query = data.formatted_address;
//   this.latitude = data.geometry.location.lat;
//   this.longitude = data.geometry.location.lng;
// }



app.listen(PORT, () => console.log(`App is up on ${PORT}`) );


