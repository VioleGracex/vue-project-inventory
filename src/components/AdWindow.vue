<template>
  <div class="ad-window">
    <span class="ad-window-text">Это окно с текстом.</span>
    <button class="close-button" @click="$emit('close')">X</button>
  </div>
</template>

<script setup lang="ts">
// No additional scripts required
</script>

<style lang="scss" scoped>
@use './_AdWindow.scss';
</style>
