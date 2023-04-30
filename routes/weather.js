const { Router } = require("express");
const { isLoggedIn } = require("../public/javascripts/auth");
const {
  getCityFromCoordinates,
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
  // const { latitude, longitude } = getUserGeolocation();
  const latitude = 53.3816738;
  const longitude = -1.4818567;
  // const city = await getCityFromCoordinates(latitude, longitude);
  const weatherData = await getWeatherData(latitude, longitude);
  const airData = await getAirQualityData(latitude, longitude);
  const data = await formatWeatherData(weatherData, airData);
  console.log(data);
  res.render("weather", { data, getDayOfWeek, getWeatherIconPath });
});

module.exports = router;
