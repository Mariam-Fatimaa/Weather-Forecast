// Function to populate countries dropdown using Rest Countries API
async function populateCountries() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  
      const countrySelect = document.getElementById("country");
  
      countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common; // Use country common name
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
      });
  
      // No need to trigger population of cities here
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  }
  
  // Function to fetch weather data based on selected country
  async function fetchWeather(countryName) {
    const apiKey = "fa0eaebedb54cf8d099b6b49f388401d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Weather fetch error:", error);
      return null;
    }
  }
  
  // Function to handle country selection and weather display
  async function handleCountrySelection() {
    const countrySelect = document.getElementById("country");
    const selectedCountry = countrySelect.value;
  
    if (!selectedCountry) return;
  
    try {
      const weatherData = await fetchWeather(selectedCountry);
  
      if (weatherData) {
        const weatherDiv = document.getElementById("weather");
        weatherDiv.innerHTML = `
          <h2>Weather in ${weatherData.name}</h2>
          <p>Temperature: ${weatherData.main.temp}°C</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
          <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        `;
      } else {
        console.error("Weather data not available");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  
  // Populate countries dropdown when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    populateCountries();
  });
  
  // Add event listener to update weather data when the country selection changes
  document.getElementById("country").addEventListener("change", handleCountrySelection);
  

// // Function to populate countries dropdown using Rest Countries API
// async function populateCountries() {
//   try {
//     const response = await fetch("https://restcountries.com/v3.1/all");
//     const countries = await response.json();
//     countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

//     const countrySelect = document.getElementById("country");

//     countries.forEach((country) => {
//       const option = document.createElement("option");
//       option.value = country.name.common; // Use country common name
//       option.textContent = country.name.common;
//       countrySelect.appendChild(option);
//     });

//     // Trigger population of cities for the initially selected country
//     populateCities();
//   } catch (error) {
//     console.error("Error fetching country data:", error);
//   }
// }

// // Function to fetch cities for a selected country using Geonames API
// async function fetchCities(countryName) {
//   const username = "i.mariamm_";
//   const url = `https://api.geonames.org/searchJSON?q=${countryName}&maxRows=10&username=${username}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch cities data");
//     }
//     const data = await response.json();
//     return data.geonames; // Return the cities data array
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return [];
//   }
// }

// // Function to populate cities dropdown based on selected country
// async function populateCities() {
//   const countrySelect = document.getElementById("country");
//   const citySelect = document.getElementById("city");
//   const selectedCountry = countrySelect.value;

//   citySelect.innerHTML = ""; // Clear previous city options

//   if (!selectedCountry) return;

//   try {
//     const cities = await fetchCities(selectedCountry);

//     cities.forEach((city) => {
//       const option = document.createElement("option");
//       option.value = city.name;
//       option.textContent = city.name;
//       citySelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error populating cities:", error);
//   }
// }

// // Populate countries dropdown when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   populateCountries();
// });

// // Add event listener to update cities dropdown when the country selection changes
// document.getElementById("country").addEventListener("change", populateCities);
// async function fetchWeather(cityName) {
//   const apiKey = "fa0eaebedb54cf8d099b6b49f388401d";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error("Failed to fetch weather data");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Weather fetch error:", error);
//     return null;
//   }
// }
