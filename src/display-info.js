// Import images for different weather conditions from exports.js
import { conditions, timeIcons } from "./exports.js";


// Picks the background image to display based off of the current weather conditions
function changeBackground(condition, times) {
    // Check if the condition description consists of multiple phrases and split it up into an array if so
    condition = condition.includes(",") ? condition.split(",") : condition;
    condition = condition.includes(" ") ? condition.split(" ") : condition;


    // Declare an array of valid states/conditions of weather
    const validStates = ["clear", "cloudy", "fog", "rain", "snow"];

    // Create an object that maps each state in validStates to an appropriate array in conditions
    const weather = Object.fromEntries(validStates.map((state, i) => [state, conditions[i]]));

    // Create two variables which will later use to store the state of the searched place and image index
    let currentState;
    let imageIndex;

    // If the condition has been split into an array check if it contains any of the states in validStates
    if (typeof condition === "object") {
        validStates.forEach(state => {
            if (condition.includes(state)) currentState = state;
        });

    // Else check if any of the states is equal to that condition and if so set it as the value of currentState
    } else {
        validStates.forEach(state => {
            if (["hail", "thunder", "showers"].includes(condition)) condition = "rain";
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
    
    if (times.currentTime >= times.sunrise && times.currentTime < times.noon) imageIndex = 0;
    else if (times.currentTime >= times.noon && times.currentTime < times.sunset) imageIndex = 1;
    else if (times.currentTime >= times.sunset && times.currentTime <= times.evening) imageIndex = 2;
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
    if (currentTime >= times.twilights.sunrise.start && 
        currentTime <= times.twilights.sunrise.end) {
        if (!isSunrise) {
            isSunrise = true;

            changeTime("sunrise");

            isSunset = false;
            isDay = false;
            isNight = false;
        } 

    // Check if time's within sunset range and call changeTime with argument of "sunset" if it is
    } else if (currentTime >= times.twilights.sunset.start && 
        currentTime <= times.twilights.sunset.end) {
        if (!isSunset) {
            isSunset = true;
            changeTime("sunset");

            isSunrise = false;
            isDay = false;
            isNight = false;
        }

    // Check if time's within day range and call changeTime with argument of "day" if it is
    } else if (currentTime >= times.periods.day.start &&
        currentTime <= times.periods.day.end) {
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

// Used to automatically change the page background after a given amount of time
let autoBackground;
let autoWeather;

function autoChangeBackground() {

}

function autoWeatherChange() {

}

// Runs clock of current time for each new location searched for 
function runClock(offset, container, times) {
    // Get the current time
    const now = new Date();

    // Get the time in hours at the current location's timezone via the offset
    let hours = (now.getHours() - 2) + offset;
    hours = hours < 0 ? 24 + hours : hours;

    // Get minutes 
    let minutes = now.getMinutes();

    // Get current time as a number 
    const current = hours + (minutes / 60);
    checkTime(current, times);

    minutes = minutes.toString().padStart(2, 0)

    // Get seconds
    const seconds = now.getSeconds().toString().padStart(2, 0);
    
    // Set the meridian and change the hours to follow 12 hour format
    const meridian = Number(hours) >= 12 ? "PM" : "AM";
    hours = (hours % 12 || 12).toString().padStart(2, 0);


    if (!(hours % 1)) {
        // Set the time string to the value of the container's text
        container.innerText = `${hours}:${minutes}:${seconds} ${meridian}`;
    }
}


function setDay(currentDate){
    // Get currentDate
    const date = new Date(currentDate); 

    // Get day container and assign the name of the day to it's innerText value
    const dayContainer = document.querySelector("[data-value='day']");
    dayContainer.innerText = date.toLocaleDateString("en-US", { weekday: "long" });
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
            end: sunrise + (5 / 60),
        },

        sunset: {
            start: sunset,
            end: sunset + (5 / 60),
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
    id = setInterval(runClock, 
        1000, 
        data.tzoffset, 
        timeContainer, 
        times,
    );
}

// Displays the weather conditions for the current day following a seven day time period
function displayWeather(data) {
    
}

export { changeBackground, displayWeather, changeTime, clockEngine, setDay };