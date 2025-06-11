import "./styles.css";
import { displayWeather, buildMainUI, getWeatherData,
getLocalTime, changeBackground, clockEngine, setDay } from "./exports.js";
import { addDays, format, parse, differenceInMinutes } from "date-fns";

buildMainUI();

document.querySelector("[data-name='search']").addEventListener("click", () => {
  const locationName = document.querySelector("[data-name='location']").value;

  if (locationName) {
    (async () => {

      // Local time information of location searched for 
      const timeData = await getLocalTime(locationName);

      
      if (timeData) {
        // Get current date and time of searched for location
        const [ date, time ] = timeData.datetime.split(" ");
        
        // Start date and End date for the weather
        let startDate = new Date(date);
        const endDate = format(addDays(startDate, 7), "yyyy-MM-dd");
        startDate = format(startDate, "yyyy-MM-dd");

        const weatherData = await getWeatherData(locationName, startDate, endDate);

        if (weatherData) {
          let weatherCond;

          // Get weather conditions depending on weather or not we have access to the current conditions
          if (Object.keys(weatherData).includes("currentConditions")) {
            weatherCond = weatherData.currentConditions.conditions.toLowerCase();
            
          } else {
            weatherCond = weatherData.days[0].conditions.toLowerCase();
          }


          const sunrise = weatherData.days[0].sunrise.slice(0, 5);
          const sunset = weatherData.days[0].sunset.slice(0, 5);

          // Format for time1 and time2
          const format = "HH:mm";

          // Used to perform calculation of noon
          let time1 = parse(sunrise, format, new Date());
          const time2 = parse(sunset, format, new Date());

          time1 = time1 < time2 ? addDays(time1, 1) : time1; 

          // Get the difference in minutes of time1 and time2 then divide it by 60 to get the hours and minutes as a decimal 
          const timeDifference = differenceInMinutes(time1, time2) / 60;

          // Get the difference in hours by truncating the minutes
          const hourDifference = Math.trunc(timeDifference);

          // Calculate noon time and make a noon time string
          const noon = `${hourDifference}:${Math.floor((timeDifference - hourDifference) * 60)}`;

          // Get sunsetMinutes + 30 minutes later and evening hours
          const sunsetMinutes = parseInt(sunset.slice(3, 5)) + 30;
          const eveningHours = sunsetMinutes >= 60 ? parseInt(sunset.slice(0, 2)) + 1: sunset.slice(0, 2);

          // Get eveningMinutes from sunsetMinutes + 30 and make evening time string
          const eveningMinutes = sunsetMinutes >= 60 ? sunsetMinutes - 60 : sunsetMinutes;
          const evening = `${eveningHours}:${eveningMinutes}`;

          const times = {
            currentTime: parse(time.slice(0, 5), format, new Date()),
            sunrise: parse(sunrise, format, new Date()),
            noon: parse(noon, format, new Date()),
            sunset: parse(sunset, format, new Date()),
            evening: parse(evening, format, new Date()),
          }
          
          // Display a background 
          changeBackground(weatherCond, times);

          // Set the day and time
          setDay(date);
          clockEngine(weatherData);

          // Lastly populate the ui with data
          displayWeather(weatherData);

        }
        console.log(weatherData);
      } 

      console.log(timeData);

    })();
  }
});

