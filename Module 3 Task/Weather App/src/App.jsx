import { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    if (!city) return;
    setWeather(null);
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      console.log(response);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">WeatherSphere</h1>
      <div className="flex space-x-2 mb-4">
        <div class="max-w-sm space-y-3">
          <input
            type="text"
            className="py-3 px-5 block w-full border-gray-200 border border-indigo-600 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Input text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loader}
          />
        </div>
        <button
          type="button"
          onClick={fetchWeather}
          className="py-3 px-4 inline-flex cursor-pointer items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          disabled={loader}
        >
          Get Weather
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 text-black rounded-lg shadow-sm hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {weather.name}, {weather.sys.country}
          </h5>

          <div className="mb-2 text-4xl font-bold tracking-tight ">
            {Math.round(weather.main.temp)}°C
          </div>

          <div className="font-normal text-gray-700">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Feels Like: {weather.main.feels_like}°C</p>
            <p>Max Temp: {weather.main.temp_max}°C</p>
            <p>Min Temp: {weather.main.temp_min}°C</p>
            <p>Pressure: {weather.main.pressure} Pa</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {loader && (
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="flex items-center w-full">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[480px]">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div class="flex items-center w-full max-w-[400px]">
            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[480px]">
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div class="flex items-center w-full max-w-[440px]">
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
          <div class="flex items-center w-full max-w-[360px]">
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
