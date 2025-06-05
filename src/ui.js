// Import images for different weather conditions from exports.js
import { conditions } from "./exports.js";

// Picks the background image to display based off of the current weather conditions
function displayBackground(condition, hour) {
    // Declare an array of valid states/conditions of weather
    const validStates = ["clear", "cloudy", "fog", "rain", "snow"];

    // Create an object that maps each state in validStates to an appropriate array in conditions
    const weather = Object.fromEntries(validStates.map((state, i) => [state, conditions[i]]));

    // Create two variables which will later use to store the state of the searched place and image index
    let currentState;
    let imageIndex;
   
    // Check if the condition description consists of multiple phrases and split it up into an array if so
    if (condition.includes(" ")) {
        condition = condition.split(" ");  

    } else if (condition.includes(",")) {
        condition = condition.split(",");
    }

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
    if (hour >= 5 && hour <= 11) imageIndex = 0;
    else if (hour >= 12 && hour <= 17) imageIndex = 1;
    else if (hour >= 18 && hour <= 19) imageIndex = 2;
    else imageIndex = 3;
    
    // Go into the weather object via the currentState and imageIndex then set that image to be the background
    document.body.style.backgroundImage = `url(${weather[currentState][imageIndex]})`;
}

// Displays the weather condition for current day
function currentWeather(data) {}

// Builds the user interface by calling all necessary functions
function buildUI(weather) {
    const weatherCond = weather.currentConditions.conditions.toLowerCase();
    const localTime = Number(weather.currentConditions.datetime.slice(0, 2));

    displayBackground(weatherCond, localTime);
}

// Exports
export { buildUI };
