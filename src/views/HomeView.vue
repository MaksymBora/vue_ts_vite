<script lang="ts" setup>
import CurrentWeather from "@/components/CurrentWeather.vue";
</script>

<template>
  <main class="container">
    <div class="wrapper">
      <CurrentWeather />
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
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
}
</style>
