function displayTemp(response) {
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
  getForecast(response.data.city);
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
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#insert-city");
  search(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
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
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "1e1b05a0d114f3f366oae3d34b816t50";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

document.querySelector("#city-input").addEventListener("submit", handleSubmit);

search("New York");
