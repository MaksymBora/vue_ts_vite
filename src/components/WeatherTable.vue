<script setup>
import { weatherIcon } from "../utils/icons";
import { formatDateTime } from "../utils/formatData";

const props = defineProps({
  searchResults: Object,
});
</script>

<template>
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
</template>

<style scoped>
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
</style>
