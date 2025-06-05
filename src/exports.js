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

const clear = [morningClear, afternoonClear, eveningClear, nightClear];
const cloudy = [morningCloudy, afternoonCloudy, eveningCloudy, nightCloudy];
const fog = [morningFoggy, afternoonFoggy, eveningFoggy, nightFoggy];
const rain = [morningRainy, afternoonRainy, eveningRainy, nightRainy];
const snow = [morningSnowy, afternoonSnowy, eveningSnowy, nightSnowy];

const conditions = [clear, cloudy, fog, rain, snow];


export { conditions };
export { buildUI } from "./ui.js";
export { getData } from "./data.js";