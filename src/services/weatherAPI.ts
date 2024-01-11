import axios from "axios";

const API_KEY = "90909333051e5594b4d9ee0fca1d9913";

export const fetchWeather = async (search: string) => {
  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${API_KEY}`
  );

  return result.data;
};
