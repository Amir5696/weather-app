const request = require("request");

const weather = (city, country, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )},${encodeURIComponent(
    country
  )}&APPID=6b114feb3f56f96a182e679fe759427c&units=metric`;
  console.log(url);
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback(err, null);
    } else if (body.message && body.cod) {
      const err = `${body.cod} : ${body.message}`;
      callback(err, null);
    } else {
      callback(null, body);
    }
  });
};

module.exports = weather;
