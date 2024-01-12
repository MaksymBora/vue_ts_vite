import { type CurrentWeatherTypes } from "@/types/CurrentWeatherTypes";
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchHourlyWeather } from "../services/weatherAPI";
import { fetchWeather } from "../services/weatherAPI";
import { type City, type List } from "@/types/WeatherTypes";

export const useWeatherStore = defineStore("weather", () => {
  const currentWeatherResult = ref<CurrentWeatherTypes | null>();
  const query = ref("");

  const queryTimeout = ref<NodeJS.Timeout | undefined>();

  const searchResultCity = ref<City>();
  const searchResults = ref<List[]>();

  const searchError = ref<boolean>();

  const currentPlace = ref("");

  function searchQuery(queryString: string) {
    query.value = queryString;
  }

  function setCurrentPlace(data: string) {
    currentPlace.value = data;
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
      const result = await fetchWeather(currentPlace.value);
      searchResults.value = result?.list;
      searchResultCity.value = result?.city;
    } catch {
      searchError.value = true;
    }
  };

  async function currentWeather() {
    try {
      const res = await fetchHourlyWeather(currentPlace.value);

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
    setCurrentPlace,
    currentPlace,
  };
});
