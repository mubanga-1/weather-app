// Import images for different weather conditions from images folder

// Morning weather condition images
import morningClear from "./images/morning-clear.jpg";
import morningCloudy from "./images/morning-cloudy.jpg";
import morningFoggy from "./images/morning-foggy.jpg";
import morningRainy from "./images/morning-rainy.jpg";
import morningSnowy from "./images/morning-snowy.jpg";

// Afternoon weather condition images
import afternoonClear from "./images/afternoon-clear.jpg";
import afternoonCloudy from "./images/afternoon-cloudy.jpg";
import afternoonFoggy from "./images/afternoon-foggy.jpg";
import afternoonRainy from "./images/afternoon-rainy.jpg";
import afternoonSnowy from "./images/afternoon-Snowy.jpg";

// Evening weather condition images
import eveningClear from "./images/evening-clear.jpg";
import eveningCloudy from "./images/evening-cloudy.jpg";
import eveningFoggy from "./images/evening-foggy.jpg";
import eveningRainy from "./images/evening-rainy.jpg";
import eveningSnowy from "./images/evening-snowy.jpg";

// Night weather condition images
import nightClear from "./images/night-clear.jpg";
import nightCloudy from "./images/night-cloudy.jpg";
import nightFoggy from "./images/night-foggy.jpg";
import nightRainy from "./images/night-rainy.jpg";
import nightSnowy from "./images/night-snowy.jpg";

// Default background image
import defaultBackground from "./images/default-image.jpg";

// Search icon
import searchIcon from "./icons/icons8-search-40.png";

// Time icons
import sunIcon from "./icons/sun.png";
import moonIcon from "./icons/moon.png";
import sunriseIcon from "./icons/sunrise.png";
import sunsetIcon from "./icons/sunset.png";

// Detail icons
import humidityIcon from "./icons/humidity.png";
import rainIcon from "./icons/rain.png";
import windSpeedIcon from "./icons/wind-speed.png";

// Weather icons
import rainyIcon from "./icons/raining.png";
import snowIcon from "./icons/raining.png";
import stormIcon from "./icons/storm.png";
import cloudyIcon from "./icons/cloud.png";
import semiCloudyIcon from "./icons/cloudy.png";

// Group condition images per the weather condition
const clear = [morningClear, afternoonClear, eveningClear, nightClear];
const cloudy = [morningCloudy, afternoonCloudy, eveningCloudy, nightCloudy];
const fog = [morningFoggy, afternoonFoggy, eveningFoggy, nightFoggy];
const rain = [morningRainy, afternoonRainy, eveningRainy, nightRainy];
const snow = [morningSnowy, afternoonSnowy, eveningSnowy, nightSnowy];

// Group conditions together
const conditions = [clear, cloudy, fog, rain, snow];

// Group Icons according to information each is supposed to convey
const detailIcons = {
  humidity: humidityIcon,
  windSpeed: windSpeedIcon,
  precipitation: rainIcon,
};

const timeIcons = {
  day: sunIcon,
  night: moonIcon,
  sunrise: sunriseIcon,
  sunset: sunsetIcon,
};

const weatherIcons = {
  clear: sunIcon,
  cloudy: cloudyIcon,
  "partially-cloudy": semiCloudyIcon,
  rain: rainyIcon,
  storm: stormIcon,
  snow: snowIcon,
};

export {
  conditions,
  defaultBackground,
  searchIcon,
  detailIcons,
  timeIcons,
  weatherIcons,
};
export {
  changeBackground,
  displayWeather,
  changeTime,
  clockEngine,
  setDay,
} from "./display-info.js";
export { buildMainUI } from "./ui.js";
export { getWeatherData, getLocalTime } from "./data.js";
export { createElement, appendChildren } from "./utils.js";
