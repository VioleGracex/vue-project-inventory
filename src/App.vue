<template>
  <main class="main-container">
    <div class="content-row">
      <ProfileWindow />
      <GridComponent />
    </div>
    <AdWindow v-if="showWindow" @close="showWindow = false" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileWindow from './components/ProfileWindow.vue'
import GridComponent from './components/GridComponent.vue'
import AdWindow from './components/AdWindow.vue'

const showWindow = ref(true)
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  gap: 32px;
  padding: 0 200px;
  box-sizing: border-box;
  overflow: hidden;
}

.content-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
    align-items: center;
  }

  .content-row {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
