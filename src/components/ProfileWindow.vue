<template>
  <div class="profile-window">
    <img src="@/assets/images/img.png" alt="Изображение профиля" class="profile-image" />
    <h2 class="profile-title">Заголовок профиля</h2>
    <p class="profile-description">Это описание профиля.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './_ProfileWindow.scss';

export default defineComponent({
  name: 'ProfileWindow',
});
</script>
