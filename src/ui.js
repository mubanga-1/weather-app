// Import images for different weather conditions from exports.js
import { defaultBackground, searchIcon, 
createElement, appendChildren, detailIcons, weatherIcons } from "./exports.js";


function buildMainUI () {

    // Display default background image
    document.body.style.backgroundImage = `url(${defaultBackground})`;

    // Make container for weather information
    const infoDisplayer = createElement({type: "div", id: "info-container", classList: [], textContent: ""});

    // Create containers for specific information on the page

    // Location searching section of page
    const locationInfo = createElement({type: "div", id: "location-info", classList: [], textContent: ""});
    const localTimeInfo = createElement({type: "div", id: "local-time-info", classList: [], textContent: ""});
    localTimeInfo.innerHTML = "<span data-value='day'></span> <span data-value='time'></span>"

    const searchLocation = createElement({type: "div", id: "search-location", classList: [], textContent: ""});
    
    // Location input for which to search the weather with
    const location = createElement({type: "input", id: "location-name", classList: [], textContent: ""});
    location.setAttribute("autocomplete", "off");
    location.dataset.name = "location";

    // Used to search for location weather upon clickling
    const searchBtn = createElement({type: "button", id: "search-btn", classList: [], textContent: ""});
    searchBtn.dataset.name = "search";

    // Create and add search icon to search button
    const searchIconElement = createElement({type: "img", id: "search-icon", classList: [], textContent: ""});
    searchIconElement.src = searchIcon;
    searchBtn.appendChild(searchIconElement);


    appendChildren(searchLocation, [location, searchBtn]);
    appendChildren(locationInfo, [localTimeInfo, searchLocation]);

    // Creates conditions section and sub divs inside it
    const currentConditions = createElement({type: "div", id: "current-conditions", classList: [], textContent: ""});

    // Used to display an icon indicating the time of the day
    const timeIconContainer =  createElement({type: "div", id: "time-icon-wrapper", classList: [], textContent: ""});
    const timeIcon = createElement({type: "img", id: "time-icon", classList: [], textContent: ""});
    timeIcon.dataset.name = "time-icon";
    timeIconContainer.appendChild(timeIcon);

    // Used to display current weather conditions i.e. tempreture, humdity, windspeed, precipitation
    const conditionsContainer = createElement({type: "div", id: "conditions-wrapper", classList: [], textContent: ""});

    // Used to display current tempreture as well as estimated daily minimum temperature
    const tempContainer = createElement({type: "div", id: "temp-wrapper", classList: [], textContent: ""});
    
    // Contains the text for the current temperature
    const tempNumber = createElement({type: "div", id: "temp", classList: [], textContent: "9"});
    tempNumber.dataset.name = "tempreture";

    // Contains the celcius unit (C) and minimum temperature
    const unitTempWrapper = createElement({type: "div", id: "unit-and-temp", classList: [], textContent: ""});

    // Contains the unit (C) text
    const unit = createElement({type: "span", id: "unit", classList: [], textContent: ""});
    unit.innerHTML = "<sup>o</sup>C";

    // Used to container the minimum tempreture value
    const minTempNumber = createElement({type: "div", id: "min-temp-wrapper", classList: [], textContent: ""});
    minTempNumber.innerHTML = "MIN <span id='min-temp' data-name='min-temp'>3</span> <sup>o</sup>C"

    appendChildren(unitTempWrapper, [unit, minTempNumber]);
    appendChildren(tempContainer, [tempNumber, unitTempWrapper]);

    // Used to wrap the containers for humidity, wind-speed and precipitation
    const detailsContainer = createElement({type: "div", id: "details-wrapper", classList: [], textContent: ""});

    // Contains the humidity stat
    const humidityContainer = createElement({type: "div", id: "humidity-wrapper", classList: ["detail"], textContent: ""});
    humidityContainer.dataset.name = "humidity";

    // Contains the wind speed stat
    const windSpeedContainer = createElement({type: "div", id: "wind-speed-wrapper", classList: ["detail"], textContent: ""});
    windSpeedContainer.dataset.name = "windSpeed";
    
    // Contains the precipitation stat
    const precipContainer = createElement({type: "div", id: "precipitation-wrapper", classList: ["detail"], textContent: ""});
    precipContainer.dataset.name = "precipitation";


    // Group weather condition wrappers
    const conditionWrappers = [humidityContainer, windSpeedContainer, precipContainer];

    // For each condition append an iconWrapper and an infoWrapper
    for (let wrapper of conditionWrappers) {

        // Create Icon wrapper
        const iconWrapper = createElement({type: "div", id: "", classList: ["icon-wrapper"], textContent: ""});
        const icon = createElement({type: "img", id: "", classList: ["detail-icon"], textContent: ""});

        // Add icon for specified condition
        icon.src = `${detailIcons[wrapper.dataset.name]}`;

        // Append icon to icon wrapper
        iconWrapper.appendChild(icon);


        // Create wrapper to hold text for specified condition
        const infoWrapper = createElement({type: "div", id: "", classList: ["info-wrapper"], textContent: "0%"});
        infoWrapper.dataset.name = "info";

        // Append iconWrapper and infoWrapper to condition wrapper
        appendChildren(wrapper, [iconWrapper, infoWrapper]);
    }


    appendChildren(detailsContainer, conditionWrappers);
    appendChildren(conditionsContainer, [tempContainer, detailsContainer]);
    appendChildren(currentConditions, [timeIconContainer, conditionsContainer]);

    // Create div for bottom widget containing conditions for the week
    const weeklyConditions = createElement({type: "div", id: "weekly-conditions", classList: [], textContent: ""});

    // Create container for each day of the week
    const daysContainer = createElement({type: "div", id: "day-container", classList: [], textContent: ""});
    weeklyConditions.appendChild(daysContainer);

    // Create array of days
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    days.forEach(day => {
        // For each day create a day container
        const dayContainer = createElement({type: "div", id: `day${days.indexOf(day)}`, classList: ["day"], textContent: ""});
        
        // Create day name container for containing the day name text
        const dayName = createElement({type: "div", id: "day-name", classList: [], textContent: `${day}`});
        dayName.dataset.name = "day";

        // Create a container for conditions of the day i.e. sky state and maximum/minimum temperatures
        const conditions = createElement({type: "div", id: "conditions", classList: [], textContent: ""});
        
        // Create container for icon depicting the sky state for that day
        const state = createElement({type: "div", id: "state-wrapper", classList: [], textContent: ""});
        const stateIcon = createElement({type: "img", id: "state", classList: [], textContent: ""});
        stateIcon.src = weatherIcons.clear;
        stateIcon.dataset.name = "day-state";

        state.appendChild(stateIcon);

        // Create container for the maximum/minimum temperatures for that day
        const temp = createElement({type: "div", id: "daily-temp", classList: [""], textContent: ""});
        temp.innerHTML = "<span data-name='max'>25<sup>o</sup></span> / <span data-name='min'>10<sup>o</sup></span>"
        temp.dataset.name = "max-min-temp"

        appendChildren(conditions, [state, temp]);
        appendChildren(dayContainer, [dayName, conditions]);
        daysContainer.appendChild(dayContainer);
    });
    

    appendChildren(infoDisplayer, [locationInfo, currentConditions, weeklyConditions]);
    document.body.appendChild(infoDisplayer);

}

// Exports
export { buildMainUI };
