<script lang="ts" setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import Navigation from "./components/Navigation.vue";
import { useWeatherStore } from "@/store/weatherStore";

const weatherStore = useWeatherStore();

onMounted(async () => {
  return await weatherStore.currentWeather();
});
</script>

<template>
  <div class="wrapper">
    <Navigation />

    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Roboto, sans-serif;
  background-color: #00668a;
}
</style>
./store/weatherStore
