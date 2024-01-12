<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useWeatherStore } from "@/store/weatherStore";

const weatherStore = useWeatherStore();

const isOpen = ref(false);

function onClickSave() {
  weatherStore.currentWeather();

  isOpen.value = false;
}
</script>

<template>
  <header>
    <nav class="container">
      <RouterLink :to="{ name: 'home' }">
        <div class="items">
          <i class="fa-solid fa-sun" style="font-size: 24px"></i>
          <p class="title">The Weather Forecast</p>
        </div>
      </RouterLink>

      <div class="info-icon-wrapper">
        <RouterLink
          :to="{ name: 'fivedays' }"
          :class="$route.name === 'fivedays' ? 'link-active' : 'link'"
          >Five Days</RouterLink
        >
        <!-- <i class="fa-solid fa-star" style="font-size: 24px"></i> -->
        <!-- <i class="fa-solid fa-plus" style="font-size: 24px"></i> -->
        <button @click="isOpen = true" type="button" class="btn-settings">
          <i class="fa-solid fa-compass" style="font-size: 24px"></i>
        </button>
      </div>
    </nav>
  </header>

  <!-- SETTING WINDOW -->
  <div v-if="isOpen" class="overlay">
    <div class="settings">
      <form @submit.prevent>
        <h4>Your current location</h4>

        <input
          v-model="weatherStore.currentPlace"
          type="text"
          class="settings-input"
          placeholder="city"
        />

        <button @click="onClickSave" type="submit" class="btn-save">
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
header {
  /* position: sticky; */
  position: relative;
  top: 0;
  background-color: #00668a;
}
.container {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: white;
  padding-top: 24px;
  padding-bottom: 24px;
  box-shadow: 1px 6px 10px 0px rgba(0, 0, 0, 0.75);
}

.items {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.title {
  font-size: 24px;
  color: white;
}

.info-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 18px;
  flex: 1;
  justify-content: end;
}

/* .fa-solid:hover {
  color: #004e71;
  transition: all 250ms ease-in-out;
  cursor: pointer;
} */

.link {
  padding: 6px;
  color: white;
  scale: 1;
  transition: all 250ms ease-in-out;
}

.link:hover {
  color: #02334a;
  scale: 1.2;
}

.link-active {
  border-bottom: 2px solid white;
  color: white;
}

.btn-settings {
  background-color: transparent;
  border: none;
  color: white;
}

.btn-settings:hover {
  color: #02334a;
  transition: all 250ms ease-in-out;
  cursor: pointer;
}

/* Setting Window */
.settings {
  position: absolute;
  top: 90px;
  right: 34px;
  background-color: white;
  width: 220px;
  padding: 24px 16px;
  border-radius: 15px;
}

.settings-input {
  padding: 5px 10px;
  border: 1px solid #02334a;
  border-radius: 4px;
}

.settings-input:focus {
  border: 1px solid rgb(7, 243, 235);
  outline: rgb(7, 243, 235);
}

.btn-save {
  cursor: pointer;
}
</style>
