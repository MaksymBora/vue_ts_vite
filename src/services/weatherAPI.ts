import axios from "axios";
import type { CurrentWeatherTypes } from "../types/CurrentWeatherTypes";
import type { WeatherTypes } from "../types/WeatherTypes";

const API_KEY = "90909333051e5594b4d9ee0fca1d9913";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";

export const fetchWeather = async (
  search: string
): Promise<WeatherTypes | null> => {
  try {
    const result = await axios.get(
      `forecast?q=${search}&units=metric&appid=${API_KEY}`
    );

    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchHourlyWeather = async (
  lat: number,
  lon: number
): Promise<CurrentWeatherTypes | null> => {
  try {
    const response = await axios.get(
      `weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
