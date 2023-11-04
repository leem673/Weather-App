function displayCurrent(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#city").innerHTML = response.data.city;
  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coordinates);
}
function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return (document.querySelector(
    "#date-time"
  ).innerHTML = `${day} ${hours}:${minutes}`);
}
formatDate();

function search(city) {
  let apiKey = "1e1b05a0d114f3f366oae3d34b816t50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrent);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(coordinates) {
  let apiKey = "1e1b05a0d114f3f366oae3d34b816t50";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
      <div class ="card text-center">
      <div class="card-body">
            <div class="forecast-date">${formatDay(day.time)}</div>
            <img
              src="${day.condition.icon_url}"
              width="50"
            />
            <div class="forecast-temps">
              <span class="forecast-high-temp">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="forecast-low-temp">${Math.round(
                day.temperature.minimum
              )}°</span>
              </div>
            </div>
          </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

document.querySelector("#city-input").addEventListener("submit", handleSubmit);

search("New York");
