<template>
  <div class="wrapper">
    <Navigation />

    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Roboto, sans-serif;
  background-color: #00668a;
}
</style>
