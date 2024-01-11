<script setup>
import { ref } from "vue";
import axios from "axios";
import { weatherDescriptionIcons } from "../utils/icons";

const API_KEY = "90909333051e5594b4d9ee0fca1d9913";
const searchQuery = ref("");
const queryTimeout = ref(null);

const searchResultCity = ref(null);

const searchResults = ref(null);

const searchError = ref(null);

const getDescriptionByMain = (main) => {
  const matchingKey = Object.keys(weatherDescriptionIcons).find(
    (key) => weatherDescriptionIcons[key].toLowerCase() === main.toLowerCase()
  );

  return matchingKey || "";
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery.value}&units=metric&appid=${API_KEY}`
        );
        searchResults.value = result.data.list;

        searchResultCity.value = result.data.city;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
    searchResultCity.value = null;
    data.value = null;
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

      <h2 class="title" v-if="searchResultCity">{{ searchResultCity.name }}</h2>
      <table v-if="searchResults" class="weatherTable">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Min Temperature</th>
            <th>Max Temperature</th>
            <th>Weather Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="searchResult in searchResults"
            :key="searchResult.dt"
            class="weatherRow"
          >
            <td>{{ searchResult.dt_txt }}</td>
            <td>{{ Math.floor(searchResult.main.temp_min) }}</td>
            <td>{{ Math.floor(searchResult.main.temp_max) }}</td>
            <td>
              <img
                :src="`https://openweathermap.org/img/wn/${getDescriptionByMain(
                  searchResult.weather[0].main
                )}@2x.png`"
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
