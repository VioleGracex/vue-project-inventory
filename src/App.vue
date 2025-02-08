<template>
  <main class="main-container">
    <ProfileWindow />
    <GridComponent />
  </main>
</template>

<script setup lang="ts">
import ProfileWindow from './components/ProfileWindow.vue'
import GridComponent from './components/GridComponent.vue'
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  gap: 32px;
  padding: 200px;
  box-sizing: border-box;
  overflow: hidden;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
