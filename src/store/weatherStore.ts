import { type CurrentWeatherTypes } from "@/types/CurrentWeatherTypes";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchHourlyWeather } from "../services/weatherAPI";

interface CoordinatesType {
  lat: number;
  lon: number;
}

export const useWeatherStore = defineStore("weather", () => {
  const currentWeatherResult = ref<CurrentWeatherTypes | null>();

  const coordinates: CoordinatesType = {
    lat: 50.35,
    lon: 7.6,
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
  };
});
