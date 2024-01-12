<script lang="ts" setup>
import { ref } from "vue";
import { useCounterStore } from "../store/testStore";
import { onMounted } from "vue";
import { fetchWeather, fetchHourlyWeather } from "../services/weatherAPI";
import { weatherIcon } from "../utils/icons";
import { formatDateTime } from "../utils/formatData";
import { type City, type List } from "@/types/WeatherTypes";
import { type CurrentWeatherTypes } from "@/types/CurrentWeatherTypes";

const searchQuery = ref("");
const queryTimeout = ref<number>();

const searchResultCity = ref<City>();
const searchResults = ref<List[]>();

const searchError = ref<boolean>();

const currentWeather = ref<CurrentWeatherTypes>();

const CounterStore = useCounterStore();

console.log(CounterStore.count);

CounterStore.increment();

console.log(CounterStore.count);

interface CoordinatesType {
  lat: number;
  lon: number;
}

const coordinates: CoordinatesType = {
  lat: 50.35,
  lon: 7.6,
};

onMounted(async () => {
  try {
    const res = await fetchHourlyWeather(coordinates.lat, coordinates.lon);

    currentWeather.value = res;
  } catch (error) {
    console.log(error);
  }
});

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await fetchWeather(searchQuery.value);
        searchResults.value = result.list;
        searchResultCity.value = result.city;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = undefined;
    searchResultCity.value = undefined;
  }, 300);
};
</script>

<template>
  <main class="container">
    <div class="wrapper">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        class="city-input"
        placeholder="Search for a city"
      />

      <p class="result-info" v-if="searchError">Sorry, something went wrong!</p>
      <p v-if="!searchError && searchResults?.length === 0">
        No results match your query, try a different term.
      </p>

      <h2 class="title" v-if="searchResultCity">
        {{ searchResultCity?.name }}
      </h2>

      <table v-if="searchResults" class="weatherTable">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Min Temperature</th>
            <th>Max Temperature</th>
            <th>Weather Condition</th>
          </tr>
        </thead>
        <tbody v-if="searchResults">
          <tr
            v-for="searchResult in searchResults"
            :key="searchResult.dt"
            class="weatherRow"
          >
            <td>{{ formatDateTime(searchResult?.dt_txt) }}</td>
            <td>{{ Math.floor(searchResult.main?.temp_min) }}</td>
            <td>{{ Math.floor(searchResult.main?.temp_max) }}</td>
            <td>
              <img
                :src="`${weatherIcon(searchResult.weather[0]?.description)}`"
                alt="Weather Icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 2rem;
  color: white;
  padding-top: 24px;
  padding-bottom: 24px;
}

.wrapper {
  position: relative;
  padding: 16px 0;
}

.city-input {
  padding: 8px 4px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  text-align: center;
  font-size: 16px;
}

.city-input::placeholder {
  color: rgb(148, 146, 143);
  text-align: center;
  font-size: 16px;
}

.city-input:focus {
  border-color: #004e71;
  outline: none;
  box-shadow: 0px 1px 0px 0px #004e71;
}

.title {
  text-align: center;
  margin-top: 24px;
}

.weatherTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.weatherTable th,
.weatherTable td {
  border: 1px solid white;
  padding: 8px;
  text-align: center;
}

.weatherRow:hover {
  background-color: #003c5a;
}

.result-info {
  padding: 8px 0;
}
</style>
../services/weatherAPI.js
