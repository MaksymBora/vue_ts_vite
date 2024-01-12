<script lang="ts" setup>
import FiveDays from "@/components/FiveDays.vue";
</script>

<template>
  <main class="container">
    <div class="wrapper">
      <FiveDays />
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
</style>
