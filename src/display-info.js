// Import images for different weather conditions from exports.js
import {
  conditions,
  timeIcons,
  weatherIcons,
  getWeatherData,
} from "./exports.js";
import { parse, format } from "date-fns";

// Keep track of location searched for in order implement automatic weather search mechanism
let location;
let changeTimes;
let startDate;
let endDate;

// Picks the background image to display based off of the current weather conditions
function changeBackground(condition, times) {
  changeTimes = times;

  // Check if the condition description consists of multiple phrases and split it up into an array if so
  condition = condition.includes(",") ? condition.split(",") : condition;
  condition = condition.includes(" ") ? condition.split(" ") : condition;

  // Declare an array of valid states/conditions of weather
  const validStates = ["clear", "cloudy", "fog", "rain", "snow"];

  // Create an object that maps each state in validStates to an appropriate array in conditions
  const weather = Object.fromEntries(
    validStates.map((state, i) => [state, conditions[i]]),
  );

  // Create two variables which will later use to store the state of the searched place and image index
  let currentState;
  let imageIndex;

  // If the condition has been split into an array check if it contains any of the states in validStates
  if (typeof condition === "object") {
    validStates.forEach((state) => {
      if (condition.includes(state)) currentState = state;
    });

    // Else check if any of the states is equal to that condition and if so set it as the value of currentState
  } else {
    validStates.forEach((state) => {
      if (["hail", "thunder", "showers"].includes(condition))
        condition = "rain";
      if (condition === "overcast") condition = "cloudy";
      if (condition === "sleet") condition = "snow";

      if (state === condition) currentState = state;
    });
  }

  // Give appropriate index of the image based on the local time of the location search for
  // Morning 5 - 12, Afternoon 12 - 17, Evening 17 - 19, Night 19 - 4
  // Morning = sunrise start to Noon, Noon = half of night time, Afternoon = Noon to sunset time,
  // Evening = sunset end time to one hour after sunset end time
  // Night time Evening end to sunrise start

  if (times.currentTime >= times.sunrise && times.currentTime < times.noon)
    imageIndex = 0;
  else if (times.currentTime >= times.noon && times.currentTime < times.sunset)
    imageIndex = 1;
  else if (
    times.currentTime >= times.sunset &&
    times.currentTime <= times.evening
  )
    imageIndex = 2;
  else imageIndex = 3;

  // Go into the weather object via the currentState and imageIndex then set that image to be the background
  document.body.style.backgroundImage = `url(${weather[currentState][imageIndex]})`;
}

// Changes the time icon upon reaching designated times i.e. sunrise, day, sunset, night
function changeTime(time) {
  const timeIcon = document.querySelector("[data-name='time-icon']");
  timeIcon.src = timeIcons[time];
}

// Used to keep track of sunrise, day, sunset and night
let isSunrise;
let isDay;
let isSunset;
let isNight;

// Used to change the ui to fit sunrise, day, sunset or night
function checkTime(currentTime, times) {
  // Check if time's within sunrise range and call changeTime with argument of "sunrise" if it is
  if (
    currentTime >= times.twilights.sunrise.start &&
    currentTime <= times.twilights.sunrise.end
  ) {
    if (!isSunrise) {
      isSunrise = true;

      changeTime("sunrise");

      isSunset = false;
      isDay = false;
      isNight = false;
    }

    // Check if time's within sunset range and call changeTime with argument of "sunset" if it is
  } else if (
    currentTime >= times.twilights.sunset.start &&
    currentTime <= times.twilights.sunset.end
  ) {
    if (!isSunset) {
      isSunset = true;
      changeTime("sunset");

      isSunrise = false;
      isDay = false;
      isNight = false;
    }

    // Check if time's within day range and call changeTime with argument of "day" if it is
  } else if (
    currentTime >= times.periods.day.start &&
    currentTime <= times.periods.day.end
  ) {
    if (!isDay) {
      isDay = true;
      changeTime("day");

      isSunset = false;
      isSunrise = false;
      isNight = false;
    }

    // Check if time's within night range and call changeTime with argument of "night" if it is
  } else {
    if (!isNight) {
      isNight = true;
      changeTime("night");

      isSunset = false;
      isDay = false;
      isSunrise = false;
    }
  }
}

// Used to keep track of weather or not the weather data and background should be changed
let autoWeather;

// Get's automatically change the weather data and background after a certain time interval
function autoChange(currentTime) {
  (async () => {
    const data = await getWeatherData(location, startDate, endDate);

    if (data) {
      let conditions = Object.keys(data).includes("currentConditions")
        ? data.currentConditions.conditions
        : data.days[0].conditions;

      changeTimes.currentTime = parse(
        currentTime.slice(0, 5),
        "HH:mm",
        new Date(),
      );

      changeBackground(conditions.toLowerCase(), changeTimes);
      displayWeather(data);

      autoWeather = false;
    } else {
      window.alert("Lost connection :(");
    }
  })();
}

// Runs clock of current time for each new location searched for
function runClock(offset, container, times) {
  // Get the current time
  const now = new Date();

  // Get the time in hours at the current location's timezone via the offset
  let hours = now.getHours() - 2 + offset;
  hours = hours < 0 ? 24 + hours : hours;

  // Get minutes
  let minutes = now.getMinutes();

  let autoTimeString = `${hours}:${minutes}`;

  // Get current time as a number
  const current = hours + minutes / 60;
  checkTime(current, times);

  minutes = minutes.toString().padStart(2, 0);

  // Get seconds
  const seconds = now.getSeconds().toString().padStart(2, 0);

  // Set the meridian and change the hours to follow 12 hour format
  const meridian = Number(hours) >= 12 && Number(hours) < 24 ? "PM" : "AM";
  hours = (hours % 12 || 12).toString().padStart(2, 0);

  if (!(hours % 1)) {
    // Set the time string to the value of the container's text
    container.innerText = `${hours}:${minutes}:${seconds} ${meridian}`;

    if (!autoWeather) {
      setTimeout(autoChange, 900000, autoTimeString);
      autoWeather = true;
    }
  }
}

function setDay(currentDate) {
  // Get currentDate
  const date = new Date(currentDate);

  // Get day container and assign the name of the day to it's innerText value
  const dayContainer = document.querySelector("[data-value='day']");
  dayContainer.innerText = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}

// Id for running the clock
let id;

function clockEngine(data) {
  // Get specific numbers of for hours and minutes of sunrise and sunset
  const sunriseHours = Number(data.days[0].sunrise.slice(0, 2));
  const sunriseMinutes = Number(data.days[0].sunrise.slice(3, 5)) / 60;

  const sunsetHours = Number(data.days[0].sunset.slice(0, 2));
  const sunsetMinutes = Number(data.days[0].sunset.slice(3, 5)) / 60;

  // Get the value of the time at sunrise and sunset inform of a number
  const sunrise = sunriseHours + sunriseMinutes;
  const sunset = sunsetHours + sunsetMinutes;

  // Make object with time range between sunsrise and day, and sunset and night
  const twilightPeriods = {
    sunrise: {
      start: sunrise,
      end: sunrise + 5 / 60,
    },

    sunset: {
      start: sunset,
      end: sunset + 5 / 60,
    },
  };

  // Make an with time range of day and night
  const dayAndNightPeriods = {
    day: {
      start: twilightPeriods.sunrise.end,
      end: twilightPeriods.sunset.start,
    },
    night: [],
  };

  const times = {
    twilights: twilightPeriods,
    periods: dayAndNightPeriods,
  };

  // Get time container
  const timeContainer = document.querySelector("[data-value='time']");

  // Clear any previously set intervals for running time
  clearInterval(id);

  // call runClock function and set new interval for running the time
  runClock(data.tzoffset, timeContainer, times);
  id = setInterval(runClock, 1000, data.tzoffset, timeContainer, times);
}

// Gets the conditions of the following seven days excluding the current day
function getWeekData(days) {
  // Declare an object to later store the names, conditions and temperatures of the following days
  const weekData = {};

  for (let i = 1; i < days.length; i++) {
    const dayName = new Date(days[i].datetime).toLocaleDateString("en-US", {
      weekday: "short",
    });

    // Get conditions
    let conditions = days[i].conditions.toLowerCase();
    conditions =
      conditions === "partially cloudy"
        ? conditions.split(" ").join("-")
        : conditions;
    conditions = conditions.includes(",") ? conditions.split(",") : conditions;
    conditions = conditions.includes(" ") ? conditions.split(" ") : conditions;

    let validConditions = Object.keys(weatherIcons);

    if (typeof conditions === "object") {
      validConditions.forEach((condition) => {
        if (conditions.includes(condition)) conditions = condition;
      });
    } else {
      if (["hail", "showers"].includes(conditions)) conditions = "rain";
      if ("thunder" === conditions) conditions = storm;
      if (["overcast", "fog"].includes(conditions)) conditions = "cloudy";
      if (conditions === "sleet") conditions = "snow";
    }

    const maxTemp = days[i].tempmax;
    const minTemp = days[i].tempmin;

    weekData[dayName] = {
      conditions: conditions,
      maxTemp: maxTemp,
      minTemp: minTemp,
    };
  }

  return weekData;
}

// Displays the weather conditions for the current day following a seven day time period
function displayWeather(data) {
  // Set the values of startDate and endDate for automatic search
  startDate = format(new Date(data.days[0].datetime), "yyyy-MM-dd");
  endDate = format(new Date(data.days[7].datetime), "yyyy-MM-dd");

  location = data.address;

  // Extract all necessary data from data object
  let temperature;
  let minTemp;
  let humidity;
  let windSpeed;
  let precipitation;

  // Get weather conditions depending on weather or not we have access the current conditions
  if (Object.keys(data).includes("currentConditions")) {
    temperature = data.currentConditions.temp;
    humidity =
      data.currentConditions.humidity !== null
        ? data.currentConditions.humidity
        : "N/A";
    windSpeed =
      data.currentConditions["windspeed"] !== null
        ? data.currentConditions["windspeed"]
        : "N/A";
    precipitation =
      data.currentConditions.precip !== null
        ? data.currentConditions.precip
        : "N/A";
  } else {
    temperature = data.days[0].tempmax;
    humidity = data.days[0].humidity !== null ? data.days[0].humidity : "N/A";
    windSpeed =
      data.days[0]["windspeed"] !== null ? data.days[0]["windspeed"] : "N/A";
    precipitation = data.days[0].precip !== null ? data.days[0].precip : "N/A";
  }

  minTemp = data.days[0].tempmin;

  // Display that information on page
  const tempContainer = document.querySelector("[data-name='temperature']");
  tempContainer.innerText = temperature;

  const minTempContainer = document.querySelector("[data-name='min-temp']");
  minTempContainer.innerText = minTemp;

  const humidityContainer = document.querySelector(
    "[data-name='humidity'] > [data-name='info']",
  );
  humidityContainer.innerText = humidity !== "N/A" ? `${humidity}%` : humidity;

  const windSpeedContainer = document.querySelector(
    "[data-name='windSpeed'] > [data-name='info']",
  );
  windSpeedContainer.innerText =
    windSpeed !== "N/A" ? `${windSpeed} km/h` : windSpeed;

  const precipContainer = document.querySelector(
    "[data-name='precipitation'] > [data-name='info']",
  );
  precipContainer.innerText =
    precipitation !== "N/A" ? `${precipitation}%` : precipitation;

  // Get week's information
  const days = getWeekData(data.days);
  let counter = 1;

  // For each day in the days object fill in the specific information on the page
  for (let day in days) {
    document.querySelector(`#day${counter} > [data-name='day']`).innerText =
      day;
    document.querySelector(`#day${counter} [data-name='day-state']`).src =
      weatherIcons[days[day].conditions];
    document.querySelector(`#day${counter} [data-name='max']`).innerText =
      days[day].maxTemp;
    document.querySelector(`#day${counter} [data-name='min']`).innerText =
      days[day].minTemp;

    counter++;
  }
}

export { changeBackground, displayWeather, changeTime, clockEngine, setDay };
