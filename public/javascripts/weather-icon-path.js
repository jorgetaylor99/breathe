function getWeatherIconPath(weatherCode) {
  let iconPath;

  switch (weatherCode) {
    case 0: // Clear sky
      iconPath = "/weather-icons/clear-day.svg";
      break;
    case 1:
    case 2:
    case 3: // Mainly clear, partly cloudy, and overcast
      iconPath = "/weather-icons/cloudy.svg";
      break;
    case 45:
    case 48: // Fog and depositing rime fog
      iconPath = "/weather-icons/partly-cloudy-day-fog.svg";
      break;
    case 51:
    case 53:
    case 55: // Drizzle: Light, moderate, and dense intensity
      iconPath = "/weather-icons/partly-cloudy-day-drizzle.svg";
      break;
    case 56:
    case 57: // Freezing Drizzle: Light and dense intensity
      iconPath = "/weather-icons/partly-cloudy-day-hail.svg";
      break;
    case 61:
    case 63:
    case 65: // Rain: Slight, moderate and heavy intensity
      iconPath = "/weather-icons/rain.svg";
      break;
    case 66:
    case 67: // Freezing Rain: Light and heavy intensity
      iconPath = "/weather-icons/hail.svg";
      break;
    case 71:
    case 73:
    case 75: // Snow fall: Slight, moderate, and heavy intensity
    case 77: // Snow grains
      iconPath = "/weather-icons/snow.svg";
      break;
    case 80:
    case 81:
    case 82: // Rain showers: Slight, moderate, and violent
      iconPath = "/weather-icons/drizzle.svg";
      break;
    case 85:
    case 86: // Snow showers slight and heavy
      iconPath = "/weather-icons/snow.svg";
      break;
    case 95: // Thunderstorm: Slight or moderate
      iconPath = "/weather-icons/thunderstorms.svg";
      break;
    case 96:
    case 99: // Thunderstorm with slight and heavy hail
      iconPath = "/weather-icons/thunderstorms-snow.svg";
      break;
    default: // Fallback icon
      iconPath = "/weather-icons/cloudy.svg";
  }

  return iconPath;
}

module.exports = {
  getWeatherIconPath,
};
