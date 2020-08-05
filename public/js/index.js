// function fetchWeather(city) {
//   fetch(`http://localhost:3000/weather?city=${city}`).then((res) => {
//     res.json().then((data) => {
//       const { err } = data;
//       if (err) {
//         return err;
//       } else {
//         return data;
//       }
//     });
//   });
// }

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("#location");

const message1 = document.querySelector("#m1");
const message2 = document.querySelector("#m2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(`/weather?city=${location}`).then((res) => {
    res.json().then((data) => {
      const { err } = data;
      if (err) {
        console.log(err);
        message1.textContent = err;
      } else if (!searchInput.value) {
        message1.textContent = "Please enter the location!";
      } else {
        console.log(data);
        message1.textContent = `Summary : Current temperture is ${data.forecast}, 
        today maximum temp is ${data.tempMax} 
        and minimum temp is ${data.tempMin}
        and there is ${data.clouds.all} cloud is in the sky`;
        message2.textContent = `Location : ${data.location}`;
      }
    });
  });
});
