const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;

const geocode = require("./utils/geoCode");
const forecast = require("./utils/foreCast");

//ssh-keygen -t rsa -b 4096 -C "harshainspire19@gmail.com"
//ls -a -l ~/.ssh
//eval `ssh-agent -s`
//ssh-add ~/.ssh/id_rsa

//cat ~/.ssh/id_rsa.pub

//Public Directory
app.use(express.static(path.join(__dirname, "../", "/public")));

//Views Settings
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../", "/views"));
hbs.registerPartials(path.join(__dirname, "../", "/views", "/partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Harsha Gudigar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Harsha Gudigar"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    help: "This is the Help Message you expecting..!",
    name: "Harsha Gudigar"
  });
});

app.get("/weather", (req, response) => {
  if (!req.query.address) {
    return response.send({
      error: "Address is required..!"
    });
  }

  geocode(req.query.address, (err, { lat, lon, loc } = {}) => {
    if (err) {
      return response.send({
        error: "Address Not found..!"
      });
    } else {
      forecast(lat, lon, (err, res) => {
        if (err) {
          return response.send({
            error: "Error in Weather Api!"
          });
        } else {
          response.send({
            forecast: `Temp ${res.temp} Today ${res.summary} Rain ${res.rain}%`,
            location: loc,
            address: req.query.address
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.status(404).render("404", {
    message: "Error Help File Not Found..!"
  });
});

app.get("*", (req, res) => {
  res.status(404).render("404", {
    message: "Error File Not Found..!"
  });
});

app.listen(port, () => console.log(`Server is up on port ${port}.`));
