const getLocationFromCoordinates = async (latitude, longitude) => {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(nominatimUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching city data: ${error}`);
    return "Unknown";
  }
};

const getWeatherData = async (latitude, longitude) => {
  try {
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon`;
    try {
      const response = await fetch(openMeteoUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
    }
  } catch (error) {
    console.error(`Error getting user's geolocation: ${error}`);
  }
};

const getAirQualityData = async (latitude, longitude) => {
  try {
    const openMeteoUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`;
    https: try {
      const response = await fetch(openMeteoUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching air quality data: ${error}`);
    }
  } catch (error) {
    console.error(`Error getting user's geolocation: ${error}`);
  }
};

const findClosestIndex = (timestamps, currentTime) => {
  let closestIndex = 0;
  let closestDifference = Math.abs(
    new Date(timestamps[0]).getTime() / 1000 - currentTime
  );

  for (let i = 1; i < timestamps.length; i++) {
    const difference = Math.abs(
      new Date(timestamps[i]).getTime() / 1000 - currentTime
    );
    if (difference < closestDifference) {
      closestIndex = i;
      closestDifference = difference;
    }
  }
  return closestIndex;
};

const formatWeatherData = (weatherData, airData) => {
  const { hourly, daily } = weatherData;

  const currentTime = Math.floor(Date.now() / 1000);
  const closestIndex = findClosestIndex(hourly.time, currentTime);

  const current = {
    // weather
    temperature: hourly.temperature_2m[closestIndex],
    humidity: hourly.relativehumidity_2m[closestIndex],
    apparentTemperature: hourly.apparent_temperature[closestIndex],
    precipitationProbability: hourly.precipitation_probability[closestIndex],
    weathercode: hourly.weathercode[closestIndex],
    windspeed: hourly.windspeed_10m[closestIndex],

    // air quality
    pm10: airData.hourly.pm10[closestIndex],
    pm2_5: airData.hourly.pm2_5[closestIndex],
    carbon_monoxide: airData.hourly.carbon_monoxide[closestIndex],
    nitrogen_dioxide: airData.hourly.nitrogen_dioxide[closestIndex],
    sulphur_dioxide: airData.hourly.sulphur_dioxide[closestIndex],
    ozone: airData.hourly.ozone[closestIndex],
  };

  const dailyData = daily.time.slice(1, 7).map((day, index) => ({
    date: day,
    weathercode: daily.weathercode[index + 1],
    maxTemp: daily.temperature_2m_max[index + 1],
    minTemp: daily.temperature_2m_min[index + 1],
  }));

  return {
    current,
    daily: dailyData,
  };
};

module.exports = {
  getLocationFromCoordinates,
  getWeatherData,
  getAirQualityData,
  formatWeatherData,
};
