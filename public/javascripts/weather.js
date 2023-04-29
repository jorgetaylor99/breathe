const getCityFromCoordinates = async (latitude, longitude) => {
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

// const formatWeatherData = (weatherData) => {
//   const { hourly, daily } = weatherData;

//   // Find the index of the closest timestamp to the current time
//   const currentTime = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp
//   const closestIndex = findClosestIndex(hourly.time, currentTime);

//   // Extract current data using the closestIndex
//   const current = {
//     currentTemperature: hourly.temperature_2m[closestIndex],
//     currentHumidity: hourly.relativehumidity_2m[closestIndex],
//     currentApparentTemperature: hourly.apparent_temperature[closestIndex],
//     currentPrecipitationProbability:
//       hourly.precipitation_probability[closestIndex],
//     currentWeatherCode: hourly.weathercode[closestIndex],
//     currentWindSpeed: hourly.windspeed_10m[closestIndex],
//   };

//   // Extract daily data for the next 7 days
//   const dailyData = daily.time.slice(0, 7).reduce((acc, day, index) => {
//     acc[`day${index + 1}Date`] = day;
//     acc[`day${index + 1}WeatherCode`] = daily.weathercode[index];
//     acc[`day${index + 1}MaxTemp`] = daily.temperature_2m_max[index];
//     acc[`day${index + 1}MinTemp`] = daily.temperature_2m_min[index];
//     return acc;
//   }, {});

//   return {
//     ...current,
//     ...dailyData,
//   };
// };

const formatWeatherData = (weatherData) => {
  const { hourly, daily } = weatherData;

  // Find the index of the closest timestamp to the current time
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp
  const closestIndex = findClosestIndex(hourly.time, currentTime);

  // Extract current data using the closestIndex
  const current = {
    temperature: hourly.temperature_2m[closestIndex],
    humidity: hourly.relativehumidity_2m[closestIndex],
    apparentTemperature: hourly.apparent_temperature[closestIndex],
    precipitationProbability: hourly.precipitation_probability[closestIndex],
    weathercode: hourly.weathercode[closestIndex],
    windspeed: hourly.windspeed_10m[closestIndex],
  };

  // Extract daily data for the next 6 days (excluding the current day)
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
  getCityFromCoordinates,
  getWeatherData,
  formatWeatherData,
};
