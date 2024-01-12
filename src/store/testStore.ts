import { type CurrentWeatherTypes } from "@/types/CurrentWeatherTypes";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchHourlyWeather } from "../services/weatherAPI";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  const currentWeatherResult = ref<CurrentWeatherTypes>();

  function increment() {
    count.value++;
  }

  interface CoordinatesType {
    lat: number;
    lon: number;
  }

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
    count,
    name,
    doubleCount,
    increment,
    currentWeather,
    currentWeatherResult,
  };
});
