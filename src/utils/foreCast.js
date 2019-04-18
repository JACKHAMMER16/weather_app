const request = require("request");

//Dark Sky API

const forecast = (lat, lon, callback) => {
  const forecastUrl = `https://api.darksky.net/forecast/98b2d503c557353dbf42eca258cbdcf4/${lat},${lon}`;

  request({ url: forecastUrl, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather service..!", undefined);
    } else if (res.body.error) {
      callback("Unable to find location..!", undefined);
    } else {
      const data = res.body;
      const temp = data.currently.temperature;
      const summary = data.daily.data[0].summary;
      const rain = data.currently.precipProbability;
      callback(undefined, {
        temp,
        summary,
        rain
      });
    }
  });
};

module.exports = forecast;
