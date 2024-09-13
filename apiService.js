import axios from 'axios';
import { OPENWEATHER_API_KEY } from '@env'
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHourlyWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    // Return response data or null if response is undefined
    return response?.data || null;
  } catch (error) {
    console.error('Error fetching hourly weather data:', error);
    return null; // Return null on error
  }
};

export const getAQIData = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response?.data || null;
  } catch (error) {
    console.error('Error fetching hourly weather data:', error);
    return null; // Return null on error
  }
}