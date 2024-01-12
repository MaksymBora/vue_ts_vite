import { type CurrentWeatherTypes } from "@/types/CurrentWeatherTypes";
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchHourlyWeather } from "../services/weatherAPI";
import { fetchWeather } from "../services/weatherAPI";
import { type City, type List } from "@/types/WeatherTypes";

interface CoordinatesType {
  lat: number;
  lon: number;
}

export const useWeatherStore = defineStore("weather", () => {
  const currentWeatherResult = ref<CurrentWeatherTypes | null>();
  const query = ref("");

  const queryTimeout = ref<NodeJS.Timeout | undefined>();

  const searchResultCity = ref<City>();
  const searchResults = ref<List[]>();

  const searchError = ref<boolean>();

  const coordinates: CoordinatesType = {
    lat: 50.35,
    lon: 7.6,
  };

  function searchQuery(queryString: string) {
    query.value = queryString;
  }

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value);

    queryTimeout.value = setTimeout(async () => {
      if (query.value !== "") {
        try {
          const result = await fetchWeather(query.value);
          searchResults.value = result?.list;
          searchResultCity.value = result?.city;
        } catch {
          searchError.value = true;
        }
        return;
      }
      searchResults.value = undefined;
      searchResultCity.value = undefined;
    }, 300);
  };

  const getFiveDaysCurrentCity = async () => {
    try {
      const result = await fetchWeather("Koblenz");
      searchResults.value = result?.list;
      searchResultCity.value = result?.city;
    } catch {
      searchError.value = true;
    }
  };

  async function currentWeather() {
    try {
      const res = await fetchHourlyWeather(coordinates.lat, coordinates.lon);

      currentWeatherResult.value = res;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    currentWeather,
    currentWeatherResult,
    getSearchResults,
    searchQuery,
    searchError,
    searchResults,
    searchResultCity,
    query,
    getFiveDaysCurrentCity,
  };
});
