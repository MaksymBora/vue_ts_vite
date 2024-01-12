<script lang="ts" setup>
import { useWeatherStore } from "@/store/weatherStore";
import { weatherIcon } from "../utils/icons";
import { formatDateTime } from "../utils/formatData";

const weatherStore = useWeatherStore();

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
</script>

<template>
  <div v-if="weatherStore?.currentWeatherResult">
    <h2>Current Weather in {{ weatherStore?.currentWeatherResult?.name }}</h2>
    <p>
      {{ formatDateTime(weatherStore?.currentWeatherResult?.dt) }}
    </p>
    <p>
      Temperature:
      {{ Math.floor(weatherStore?.currentWeatherResult?.main.temp) }} ℃
    </p>
    <p>
      Feels Like:
      {{ Math.floor(weatherStore?.currentWeatherResult?.main.feels_like) }} ℃
    </p>
    <p>Pressure: {{ weatherStore?.currentWeatherResult?.main.pressure }}</p>
    <p>Humidity: {{ weatherStore?.currentWeatherResult?.main.humidity }}</p>
    <p>
      Sunset at:
      {{ formatTimestamp(weatherStore?.currentWeatherResult?.sys.sunset) }}
    </p>

    <img
      :src="`${weatherIcon(
        weatherStore?.currentWeatherResult?.weather[0].description
      )}`"
      alt="Weather Icon"
      width="48"
    />
  </div>
</template>

<style scoped></style>
