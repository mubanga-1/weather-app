// Import helpful functions from date-fns
import { addDays, format } from "date-fns";

// Create start day for the current day and format it accordingly
const startDate = new Date();
const startDateFormated = format(startDate, "yyyy-MM-dd");

// Use addDays function to get the date of the day that comes after 7 days and format it
const endDate = addDays(startDate, 7);
const endDateFormated = format(endDate, "yyyy-MM-dd"); 


// Asynchronously get weather data of any specified location on startDateFormated date (at timeString time) to endDateFormated date
async function getData(location) {
    
  try {
      const request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDateFormated}/${endDateFormated}?unitGroup=metric&key=JTVVBMHKSH6MFJEKCRRK3RPCY`,
      { mode: "cors" },
    );

    // Store response in once retrieved from the api
    const response = await request.json();

    return response;

  } catch(err) {
    window.alert(err); 
  }
}

export { getData };
