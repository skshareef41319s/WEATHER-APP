const apiKey = "d61e3ea4f290ed145c38d53acd59c304";

async function getWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unable to fetch weather data');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherData').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location.trim() === '') {
        document.getElementById('weatherData').innerHTML = '<p>Please enter a location.</p>';
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    getWeather(url);
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            getWeather(url);
        }, error => {
            document.getElementById('weatherData').innerHTML = `<p>Geolocation error: ${error.message}</p>`;
        });
    } else {
        document.getElementById('weatherData').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

function displayWeather(data) {
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('city').textContent = `${data.name}`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
