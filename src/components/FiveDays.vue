<script lang="ts" setup>
import { ref } from "vue";
import { fetchWeather } from "../services/weatherAPI";
import WeatherTable from "@/components/WeatherTable.vue";
import { type City, type List } from "@/types/WeatherTypes";

const searchQuery = ref("");
const queryTimeout = ref<number>();

const searchResultCity = ref<City>();
const searchResults = ref<List[]>();

const searchError = ref<boolean>();

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

  <WeatherTable :searchResults="searchResults" />
</template>

<style scoped>
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

.result-info {
  padding: 8px 0;
}
</style>
