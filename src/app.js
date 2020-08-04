const weather = require("./utils/weather");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();


const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDir));
hbs.registerPartials(partialsDir);
app.set("view engine", "hbs");
app.set("views", viewsDir);

app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});

app.get("/weather", (req, res) => {
  const [city, country] = [req.query.city, req.query.country];
  if (!city) {
    return res.send({ error: "You must provide City and Country!" });
  }
  weather(city, country, (err, weatherRes) => {
    if (err) {
      return res.send({ err });
    }
    console.log(weatherRes);
    res.send({
      forecast: weatherRes.main.temp,
      location: `${weatherRes.name}${
        weatherRes.sys.country ? " " + weatherRes.sys.country : ""
      }`,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term.",
    });
  }
  console.log(req.query);
  res.send({
    product: [],
  });
});

//404 Page
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error : 404",
    errorTitle: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error : 404",
    errorTitle: "Page not found.",
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 3000");
  }
});
