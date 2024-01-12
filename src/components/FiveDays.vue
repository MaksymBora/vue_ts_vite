<script lang="ts" setup>
import { onMounted } from "vue";
import WeatherTable from "@/components/WeatherTable.vue";
import { useWeatherStore } from "@/store/weatherStore";

const weatherStore = useWeatherStore();

onMounted(async () => {
  return await weatherStore.getFiveDaysCurrentCity();
});
</script>

<template>
  <input
    v-model="weatherStore.query"
    @input="weatherStore.getSearchResults"
    type="text"
    class="city-input"
    placeholder="Search for a city"
  />

  <p class="result-info" v-if="weatherStore.searchError">
    Sorry, something went wrong!
  </p>

  <p
    v-if="!weatherStore.searchError && weatherStore.searchResults?.length === 0"
  >
    No results match your query, try a different term.
  </p>

  <h2 class="title" v-if="weatherStore.searchResultCity">
    {{ weatherStore.searchResultCity?.name }}
  </h2>

  <WeatherTable :searchResults="weatherStore.searchResults" />
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
