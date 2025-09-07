// Replace with your OpenWeatherMap API key
const apiKey = "YOUR_WEATHER_KEY_HERE";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update UI
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    // Add weather icon
    const iconCode = data.weather[0].icon; 
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").src = iconUrl;

    document.getElementById("weather-info").classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
}
