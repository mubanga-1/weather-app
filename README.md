# ☁ Weather App
Welcome to the **Weather App** project, developed as part of the Odin Project's curriculum projects. This project showcases use of external API's, DOM manipulation using vanilla JavaScript and efficient state management.

---

## 📖 Project Overview
The **Weather App** serves as a dyanmic single-page application (SPA) via which to search for the weather forcast for the current day following along the a seven day period. This project demonstrates the ability to:

---

- Use of third party APIs: The data used to showcase the weather forecast for an eight day period (current day inclusive) is retrieved from an external resource.

- Effectively parse data: The data is received in JSON format and made use of to display necessary information which the user is meant to take note of.

- Dynamically render content: All the HTML is dynamically rendered through the use of vanilla JavaScript, showing proficieny in DOM manipulation.

- Modular architecture: Each major piece of the project (getting data, generating the UI, displaying data) is encapsulated in its own JavaScript module, promoting clean and maintainable code.

- Utilize Webpack: This project is bundled using webpack, streamlining asset management and deployment.

---

## 🚀 Features
- Data Retrieval: JavaScript is used to request weather data is via an API call to an external service.
- Dynamic Content Rendering: A JavaScript module is used to generate the ui by injecting HTML content into the DOM.
- Webpack Integration: Effective bundling of assets for streamlined development and deployment.

---

## 🛠 Technologies Used
- JavaScript (ES6+): For DOM manipuation and application logic.
- HTML5 & CSS3: For structuring and styling the webpage.
- Webpack: For bundling JavaScript modules and assets.
- npm: For managing project dependancies.

---

## 📁 Project Structure

```
|-- dist/               # Complied and bundled files
|-- src/                # Source files
|-- package.json        # Project metadata and dependancies.
|-- .prettierrc         # Prettier configuration file
|-- eslint.config.mjs   # ESlint configuration file
|-- webpack.common.js   # Main Webpack configuration file
|-- webpack.dev.js      # Webpack configuration file for development
|-- webpack.prod.js     # Webpack configuration file for production
```

---

## 📷 Screenshots

![location: Tokyo](https://i.imgur.com/Jwv9EL8.png)
*Tokyo*

![location: London](https://i.imgur.com/EOeIp4s.png)
*London*

![location: New York](https://i.imgur.com/Qgwmjfh.png)
*New York*

![location: Los Angeles](https://i.imgur.com/mB6YHaQ.png)
*Los Angeles*

![location: Moscow](https://i.imgur.com/IrVQ1Lg.png)
*Moscow*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.