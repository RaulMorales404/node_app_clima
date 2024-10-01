require("dotenv").config();
const axios = require("axios");
const access_token = process.env.MAPBOX_KEY;
const APPID = process.env.MAP_CLIMA_KEY
const AxiosHttp = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/",
  params: {
    access_token,
    limit: 6,
    proximity: "ip",
    language: "es",
  },
});
const AxiosMapCording = axios.create({
  baseURL:"https://api.openweathermap.org/data/2.5/",
  params:{
    APPID,
    units:'metric',
    lang:'es'
  }
})
module.exports = {AxiosHttp,AxiosMapCording};

