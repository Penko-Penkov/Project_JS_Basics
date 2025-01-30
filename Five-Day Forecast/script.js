document.getElementById('get-weather').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city').value;
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    try {
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        if (geocodeData.results && geocodeData.results.length > 0) {
            const { latitude, longitude } = geocodeData.results[0];
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            displayWeather(weatherData.current_weather);
            displayForecast(weatherData.daily);
        } else {
            document.getElementById('weather-result').innerText = 'City not found. Please try again.';
        }
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

function displayForecast(forecast) {
    const forecastResult = document.getElementById('forecast-result');
    forecastResult.innerHTML = '<h2>5-Day Forecast:</h2>';
    for (let i = 0; i < 5; i++) {
        forecastResult.innerHTML += `
            <p>Date: ${forecast.time[i]}</p>
            <p>Max Temp: ${forecast.temperature_2m_max[i]}°C</p>
            <p>Min Temp: ${forecast.temperature_2m_min[i]}°C</p>
            <p>Weather: ${forecast.weathercode[i]}</p>
            <hr>
        `;
    }
}
