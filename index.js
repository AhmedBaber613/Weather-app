//Weather app:
// We need to fetch the data using the api with the api key
//and then show it using html templates. Weather app hear we come!!!

//some DOM constants here
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "679be55f08cf00c3a4e9498d41940359";

//An event listner
weatherForm.addEventListener("submit", async event => {

  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } 
    catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError('Please enter city');
  }
});

//some functions
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('could not fetch weather data');
  }

  return await response.json();
}

function displayWeatherInfo (data) {

  //Getting all the data from the json and then seeding it into the data attribute
  const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
  card.textContent = "";
  card.style.display = "flex";

  //creating the visual text and weather data and then creating them
  const cityDisplay = document.createElement("h1");
  const descDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  //adding text content to the variables
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  //now adding the classes 
  cityDisplay.classList.add('cityDisplay');
  tempDisplay.classList.add('tempDisplay');
  humidityDisplay.classList.add('humidityDisplay');
  descDisplay.classList.add('descDisplay');
  weatherEmoji.classList.add('weatherEmoji');

  //and appending them
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji (weatherId) {

  //checking the weather id code and then converting it to emojis
  switch(true) {
    case (weatherId >= 200 && weatherId < 300):
      return '⛈️';
    case (weatherId >= 300 && weatherId < 400):
      return '🌧️';
    case (weatherId >= 500 && weatherId < 600):
      return '☔';
    case (weatherId >= 600 && weatherId < 700):
      return '❄️';
    case (weatherId >= 700 && weatherId < 800):
      return '🌫️';
    case (weatherId === 800):
      return '☀️';
    case (weatherId >= 801 && weatherId < 810):
      return '☁️';
    default: 
      return '❓';
  }
}

function displayError (message) {
  //code for error
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}