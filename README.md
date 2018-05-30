# Aerocene Float Predictor

The Aerocene Float Predictor is a global forecasting system that utilises open meteorological data to predict flight paths of aerosolar powered Sculptures circling around the globe without CO2 emissions. Incorporating real-time information from 16-day forecasts of wind speeds at different altitudes, the Float Predictor is a navigational tool used to plan journeys in the Aerocene epoch.

Beginning in 2012, the Float Predictor started as a collaborative project with Aerocene community members, artist Tomás Saraceno and meteorologist Lodovica Illari at the MIT Department of Earth, Atmospheric and Planetary Sciences (EAPS). Together they wanted to explore how to circumnavigate the world using no other resource than the sun. Soon joined by oceanographer Glenn Flierl and research assistant Bill McKenna, they begun examining data from MIR (Montgolfières InfraRouges) solar balloon float conducted by the Centre Nationale d’Etudes Spatiales (CNES), and computing float paths for balloons floating for several weeks at particular heights (or undergoing day-night cycles of rising and falling). After simulating the evolving wind patterns around the globe based on wind forecast data from the U.S. National Oceanic and Atmospheric Administration, the EAPS team created an interactive web interface and thus the Float Predictor was born. You can read more about this collaboration here.

In late 2017, [Studio Folder](http://www.studiofolder.it) from Milan, Italy, continued MIT's work by developing a new visualisation environment coupled with modern programming standards. Since then, the Float Predictor has been continuously developed by the Aerocene community. 

# APIs

To make sure API responses are easier to handle, Aeroglyphs are organised in pages of 30 items, ordered chronologically.
- In order to access each page use this URL structure:
http://floatpredictor.aerocene.org/scripts/api/api.php?page=:page

- In order to access the Aeroglyphs individually use this URL structure:
http://floatpredictor.aerocene.org/scripts/api/api.php?id=:id



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Credits
Aerocene is an open artistic project by [Studio Tomàs Saraceno](http://tomassaraceno.com). The current Aerocene Float Predictor has been designed and develped by [Studio Folder](http://www.studiofolder.it) and [Angelo Semeraro](http://angelosemeraro.info), and is based on the work of a dedicated and enthusiastic team of community members including: Lodovica Illari, Glenn Flierl, Bill McKenna (MIT Department of Earth, Atmospheric and Planetary Sciences), Marco Ferrari, Elisa Pasqual, Luca Ferrario, Iacopo Leardini, Angelo Semeraro (Studio Folder), Imperial College London, Studio Tomás Saraceno, Joaquin Ezcurra, Radioamateurs DE & UK, and the UK High Altitude Society. 

## Links
- [Aerocene Float Predictor](http://floatpredictor.aerocene.org/)
- [Aerocene project](http://aerocene.org/)
- [Aerocene forum](https://forum.aerocene.org/)
