document.getElementById('get-weather').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=42.6977&longitude=23.3219&current_weather=true&timezone=Europe/Sofia`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data.current_weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-result').innerText = 'Error fetching weather data. Please try again later.';
    }
}

function displayWeather(weather) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Wind Speed: ${weather.windspeed} km/h</p>
        <p>Weather: ${weather.weathercode}</p>
    `;
}
