// Wait until the full HTML document loads before running the script
document.addEventListener("DOMContentLoaded", () => {

    // Selecting DOM elements
    const CityInput = document.querySelector("#city-input");      // Input field where user types city
    const GetWeatherBtn = document.querySelector("#get-weather-btn"); // Button to trigger weather fetch
    const WeatherInfo = document.querySelector("#weather-info");  // Container that shows weather data
    const CityName = document.querySelector("#city-name");        // Element to display city name
    const Temperature = document.querySelector("#temperature");   // Element to display temperature
    const FeelsLikeTemp = document.querySelector("#Feels-like")
    const Description = document.querySelector("#description");   // Element to display weather description
    const ErrorMsg = document.querySelector("#error-message");    // Element to show error message
    
    // Your OpenWeather API key (⚠️ visible to everyone in frontend apps)
    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

    // Add click event listener to button
    GetWeatherBtn.addEventListener('click', async () => {
console.log("Button clicked");
        // Get city name from input
        // FIX: use .value instead of ariaValueMax
        const city = CityInput.value.trim().toLowerCase();

        // If input is empty, stop execution
        if (!city) return;
        
        try {
            // Call function to fetch weather data
            const weatherData = await FetchWeatherData(city);

            // Display fetched weather data
            DisplayWeatherData(weatherData);

              // ✅ Clear input after success
        CityInput.value = "";

        } catch (error) {
            // If something fails, show error message
            showError();
        }
        
    });


    // Function to fetch weather data from OpenWeather API
    const FetchWeatherData = async (city) => {

        // Create API request URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        // Send request to API
        const response = await fetch(url);

        // If response is not successful (e.g., 404 city not found)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Convert response to JSON
        const json = await response.json();

        console.log("Response:", json);

        // Return data so it can be used elsewhere
        return json;
    };


    // Function to display weather data on the page
    const DisplayWeatherData = (weatherData) => {

        // Hide error message if visible
        ErrorMsg.classList.add('hidden');

        // Show weather info section
        WeatherInfo.classList.remove('hidden');

        // Update UI with data from API
        CityName.textContent = weatherData.name;
        Temperature.textContent = ` Temp : ${weatherData.main.temp} °C`;
        FeelsLikeTemp.textContent = `Feels Like : ${weatherData.main.feels_like}`;
        Description.textContent = weatherData.weather[0].description;
    };


    // Function to show error message
    const showError = () => {
        WeatherInfo.classList.add('hidden');   // Hide weather data
        ErrorMsg.classList.remove('hidden');   // Show error message
    };

});