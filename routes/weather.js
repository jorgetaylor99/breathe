const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth");
const {
  getLocationFromCoordinates,
  getWeatherData,
  getAirQualityData,
  formatWeatherData,
} = require("../public/javascripts/weather");
const { getDayOfWeek } = require("../public/javascripts/weekday");
const {
  getWeatherIconPath,
} = require("../public/javascripts/weather-icon-path");
const router = Router();

router.get("/weather", isLoggedIn, async (req, res) => {
  // default to London
  const latitude = 53.38297;
  const longitude = -1.4659;

  const location = await getLocationFromCoordinates(latitude, longitude);
  const weatherData = await getWeatherData(latitude, longitude);
  const airData = await getAirQualityData(latitude, longitude);
  const data = await formatWeatherData(weatherData, airData);

  res.render("weather", { data, location, getDayOfWeek, getWeatherIconPath });
});

module.exports = router;
