let str = "seoul";
let myapi = "eZOXJKymZO_iptCcD1-0mL_dK9x2i-OAB818HoA2TZY";
let weatherapi = "fc0a079e07a2caba2c926d874024b9c5";

let imageElement = document.querySelector("#unsplashImage");
let imageLink = document.querySelector("#imageLink");
let creator = document.querySelector("#creator");
let btn = document.querySelector(".search");
btn.addEventListener("click", () => {
  let val = document.querySelector(".search-bar").value;
  if (val != null) {
    console.log(val);
    let start = `https://api.unsplash.com/photos/random/?query=${val}&orientation=landscape&client_id=${myapi}`;
    let weatherdata = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${weatherapi}`;
    // fetch(arr)
    //   .then((res) => res.json())
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    fetch(weatherdata)
      // .then((res) => console.log(res.json()))
      .then((res) => res.json())
      .then((data) => displayweather(data))
      .catch((err) => {
        alert("No weather found.");
        throw new Error("No weather found.");
      });
    fetch(start)
      .then((response) => response.json())
      .then(function (jsondata) {
        imageElement.src = jsondata.urls.regular;
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  } else {
    str = "tokyo";
  }
});

// document
//   .querySelector(".search button")
//   .addEventListener("click", console.log(val));
// str = val;
// console.log(val);
// document
//   .querySelector(".search-bar")
//   .addEventListener("keyup", function (event) {
//     if (event.key == "Enter") {
//       fetchWeather(val);
//     }
//   });
function displayweather(data) {
  document.querySelector("#city").innerText = "Weather at " + data.name;
  document.querySelector(".description").innerText =
    data.weather[0].description;
  document.querySelector(".temp").innerText =
    Math.round(data.main.temp - 273) + "°C";
  document.querySelector(".humidity").innerText =
    "Humidity: " + data.main.humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind speed: " + data.wind.speed + " km/h";
  let compare_var = data.weather[0].main;
  console.log("time rn: ", new Date(data.dt * 1000 - data.timezone * 1000)); // minus
  console.log("time rn2: ", new Date(data.dt * 1000 + data.timezone * 1000)); // minus
  let image = document.querySelector(".icon");
  switch (compare_var) {
    case "Clear":
      image.src = "images/sun.png";
      break;

    case "Rain":
      image.src = "images/rainy-day.png";
      break;

    case "Snow":
      image.src = "images/snowy.png";
      break;

    case "Clouds":
    case "Mist":
      image.src = "images/cloudy.png";
      break;

    case "Haze":
      image.src = "images/wind.png";
      break;
    case "Smoke":
      image.src = "images/foggy.png";
      break;
    default:
      image.src = "";
  }
}
