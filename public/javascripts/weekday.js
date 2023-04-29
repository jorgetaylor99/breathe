function getDayOfWeek(dateString) {
  const dateObject = new Date(dateString);
  const dayNumber = dateObject.getDay();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[dayNumber];
}

module.exports = {
  getDayOfWeek,
};
