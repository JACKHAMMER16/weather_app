const request = require("request");

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiaGFyc2hhaW5zcGlyZTE5IiwiYSI6ImNqdWxhZmVsZDF5b2s0YXFqNzMwZGtzaGgifQ.WwknEh9K61YOOzZ5v7ADmQ`;

  request({ url: geoUrl, json: true }, (err, res) => {
    if (err) {
      callback("Unable to connect to weather service..!", undefined);
    } else if (res.body.features.length === 0) {
      callback("Unable to find location..!", undefined);
    } else {
      const data = res.body;
      callback(undefined, {
        lat: data.features[0].center[0],
        lon: data.features[0].center[1],
        loc: data.features[0].place_name
      });
    }
  });
};

// geocode("Mysuru", (err, res) => {
//     if (err) console.log(err);
//     else console.log(res);
//   });

module.exports = geocode;
