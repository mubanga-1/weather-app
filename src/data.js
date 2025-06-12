// Asynchronously get weather data of any specified location on startDateFormated date (at timeString time) to endDateFormated date
async function getWeatherData(location, startDate, endDate) {
  try {
    // Make api call for weather data
    const request = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=JTVVBMHKSH6MFJEKCRRK3RPCY`,
      { mode: "cors" },
    );

    // Store response in once retrieved from the api as json
    const response = await request.json();

    return response;
  } catch (err) {
    // If an error was caught display it to user via an alert box
    window.alert(err);
  }
}

async function getLocalTime(location) {
  try {
    // Make call to api for local time information
    const request = await fetch(
      `https://timezone.abstractapi.com/v1/current_time/?api_key=9d63a093bc89406db3e3f9280040a8f8&location=${location}`,
      { mode: "cors" },
    );

    // Store and retrieve request response as json
    const response = await request.json();

    return response;
  } catch (err) {
    // If an error was caught display it to user via an alert box
    window.alert(err);
  }
}

export { getWeatherData, getLocalTime };
