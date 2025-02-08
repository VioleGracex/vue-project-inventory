<template>
  <div class="profile-window">
    <img src="@/assets/images/img.png" alt="Profile Image" class="profile-image" />
    <h2 class="profile-title">Profile Title</h2>
    <p class="profile-description">This is a description of the profile.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileWindow',
})
</script>

<style scoped>
.profile-window {
  width: 236px;
  height: 500px;
  padding: 16px;
  box-sizing: border-box;
  background: #4d4d4d;
  border-radius: 12px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.profile-title {
  margin: 16px 0 8px;
  font-size: 1.5em;
  text-align: center;
}

.profile-description {
  font-size: 1em;
  text-align: center;
}

@media (max-width: 768px) {
  .profile-window {
    width: 100%;
    height: auto;
  }
}
</style>
