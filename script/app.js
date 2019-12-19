'use strict';
var timeout = null;
let city;

const listenToCheckbox = function() {
  let domCheckbox = document.querySelector('.js-checkbox');
  domCheckbox.addEventListener('input', function() {
    if (this.checked) {
      document.querySelector('#temp').innerHTML = fahrenheitToDegree(document.querySelector('#temp').innerHTML.replace(/[^0-9.]/g, ''));
      document.querySelector('#min').innerHTML = fahrenheitToDegree(document.querySelector('#min').innerHTML.replace(/[^0-9.]/g, ''));
      document.querySelector('#max').innerHTML = fahrenheitToDegree(document.querySelector('#max').innerHTML.replace(/[^0-9.]/g, ''));
    } else {
      document.querySelector('#temp').innerHTML = degreeToFahrenheit(document.querySelector('#temp').innerHTML.replace(/[^0-9.]/g, ''));
      document.querySelector('#min').innerHTML = degreeToFahrenheit(document.querySelector('#min').innerHTML.replace(/[^0-9.]/g, ''));
      document.querySelector('#max').innerHTML = degreeToFahrenheit(document.querySelector('#max').innerHTML.replace(/[^0-9.]/g, ''));
    }
  });
};

const listenTocityInput = function() {
  let domCityInput = document.querySelector('.js-city');
  domCityInput.addEventListener('input', function() {
    this.onkeyup = function(e) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        getDataWeather(domCityInput.value);
      }, 500);
    };
  });
};

const getDataWeather = function(city) {
  handleData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8f3b7edeb73339d9e00b34e1074ab900`, showData);
};

const showData = function(jsonObject) {
  let days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  console.log(jsonObject);
  console.log('Pressure: ' + jsonObject.main.pressure);
  document.querySelector('#day').innerHTML = days[new Date(Date.now()).getDay()];
  document.querySelector('#temp').innerHTML = (jsonObject.main.temp - 273.15).toFixed(2) + '°C';
  document.querySelector('#weather').innerHTML = jsonObject.weather[0].main;
  document.querySelector('#description').innerHTML = jsonObject.weather[0].description;
  document.querySelector('#min').innerHTML = (jsonObject.main.temp_min - 273.15).toFixed(2) + '°C';
  document.querySelector('#max').innerHTML = (jsonObject.main.temp_max - 273.15).toFixed(2) + '°C';
  document.querySelector('#humidity').innerHTML = jsonObject.main.humidity;
  document.querySelector('#pressure').innerHTML = jsonObject.main.pressure;
  document.querySelector('#speed').innerHTML = jsonObject.wind.speed;
  document.querySelector('#degree').innerHTML = jsonObject.wind.deg;
  let sunriseDate = new Date(jsonObject.sys.sunrise * 1000);
  document.querySelector('#sunrise').innerHTML = `${sunriseDate.getHours()}:${new String(sunriseDate.getMinutes()).padStart(2, '0')}`;
  let sunsetDate = new Date(jsonObject.sys.sunset * 1000);
  document.querySelector('#sunset').innerHTML = `${sunsetDate.getHours()}:${new String(sunsetDate.getMinutes()).padStart(2, '0')}`;
  let type = jsonObject.weather[0].main;
  switch (type) {
    case 'Clouds':
      document.body.style.backgroundImage = "url('./img/sky-690293_1920.jpg')";
      break;
    case 'Rain':
      document.body.style.backgroundImage = "url('./img/water-drop-384649_1920.jpg')";
      break;
    case 'Sunny':
      document.body.style.backgroundImage = "url('./img/sunny-soon-2996366_1920.jpg')";
      break;
    case 'clear':
      document.body.style.backgroundImage = "url('./img/boat-3292919_1920.jpg')";
      break;
    default:
      document.body.style.backgroundImage = "url('./img/dawn-190055_1280.jpg')";
      break;
  }
};

const degreeToFahrenheit = function(value) {
  return (value * 1.8 + 32).toFixed(2) + 'F';
};

const fahrenheitToDegree = function(value) {
  return ((value - 32) / 1.8).toFixed(2) + '°C';
};

const init = function() {
  //getDataWeather();
  listenTocityInput();
  listenToCheckbox();
};

document.addEventListener('DOMContentLoaded', function() {
  console.info('DOM geladen');
  init();
});
