const apiKey = 'your_openweathermap_api_key'; // Replace with your API key from OpenWeatherMap

async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        const weather = {
            name: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };

        displayWeather(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data');
    }
}

function displayWeather(weather) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${weather.name}, ${weather.country}</h2>
        <img src="${weather.icon}" alt="weather icon">
        <p>${weather.description}</p>
        <p><strong>${weather.temperature}°C</strong></p>
    `;
}
