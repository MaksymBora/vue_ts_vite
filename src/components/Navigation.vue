<script lang="ts" setup>
import { RouterLink } from "vue-router";
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
        <!-- <i class="fa-solid fa-star" style="font-size: 24px"></i> -->
        <!-- <i class="fa-solid fa-plus" style="font-size: 24px"></i> -->
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  /* position: sticky; */
  top: 0;
  background-color: #00668a;
}
.container {
  padding: 2rem;
  display: flex;
  align-items: center;
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
  gap: 12px;
  flex: 1;
  justify-content: end;
}

.fa-solid:hover {
  color: #004e71;
  transition: all 250ms ease-in-out;
  cursor: pointer;
}
</style>
