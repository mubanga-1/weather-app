import "./styles.css";
import { buildUI, getData } from "./exports.js";

(async () => {
  const weatherData = await getData("ndola");
  console.log(weatherData);
  buildUI(weatherData);

})();