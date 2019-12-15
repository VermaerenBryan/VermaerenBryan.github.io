'use strict';

const getDataWeather = function() {
  handleData('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8f3b7edeb73339d9e00b34e1074ab900', showData);
};

const showData = function(jsonObject) {
  console.log(jsonObject);
  console.log('Pressure: ' + jsonObject.main.pressure);
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM geladen');
  getDataWeather();
});
