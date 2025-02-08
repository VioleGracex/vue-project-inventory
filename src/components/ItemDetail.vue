<template>
  <div class="inventory__detail">
    <img src="@/assets/images/item.png" alt="Item Image" class="inventory__detail-image" />
    <div class="inventory__detail-info">
      <h2 class="inventory__detail-title">Item Name</h2>
      <p class="inventory__detail-description">
        Item description goes here. It provides details about the item.
      </p>
    </div>
    <div class="inventory__detail-action">Use Item</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemDetail',
})
</script>

<style scoped>
.inventory__detail {
  width: 30%;
  background: #4d4d4d;
  padding: 20px;
  border-radius: 8px;

  &-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  &-info {
    margin-top: 15px;
  }

  &-title {
    color: #dcdcdc;
  }

  &-description {
    font-size: 14px;
    opacity: 0.8;
  }

  &-action {
    background: lighten(#4d4d4d, 10%);
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;

    &:hover {
      background: #3a3a3a;
    }
  }
}
</style>
