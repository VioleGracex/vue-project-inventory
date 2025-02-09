<template>
  <div v-if="visible" :class="['item-details', { 'show': isVisible, 'hide': !isVisible }]">
    <div class="item-details-content">
      <div class="image-area">
        <img v-if="item?.image" :src="item?.image" alt="Item Image" />
        <div v-else class="placeholder"></div>
      </div>
      <div class="details-area">
        <div class="separator"></div>
        <h2>{{ item?.title }}</h2>
        <p>{{ item?.description }}</p>
      </div>
      <div class="actions-area">
        <div class="separator"></div>
        <button v-show="!confirmDelete" @click="confirmDelete = true" class="delete-button">Delete</button>
        <div v-show="confirmDelete" class="delete-confirmation">
          <p>Select quantity to delete:</p>
          <input type="number" v-model="deleteQuantity" :max="item?.quantity" min="1" class="delete-input" />
          <div class="buttons">
            <button class="cancel-button" @click="confirmDelete = false">Cancel</button>
            <button class="confirm-button" @click="handleDelete">Confirm</button>
          </div>
        </div>
      </div>
    </div>
    <button class="close-button" @click="closeDetails">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ItemDetails',
  props: {
    item: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'delete'],
  setup(props, { emit }) {
    const confirmDelete = ref(false)
    const deleteQuantity = ref(1)
    const visible = ref(false)
    const isVisible = ref(false)

    watch(() => props.show, (newVal) => {
      if (newVal) {
        visible.value = true
        setTimeout(() => {
          isVisible.value = true
        }, 0)
      } else {
        isVisible.value = false
        setTimeout(() => {
          visible.value = false
          emit('close')
        }, 600) // Delay to match the slide out animation
      }
    })

    const handleDelete = () => {
      emit('delete', deleteQuantity.value)
    }

    const closeDetails = () => {
      isVisible.value = false
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, 600) // Delay to match the slide out animation
    }

    return {
      confirmDelete,
      deleteQuantity,
      handleDelete,
      closeDetails,
      visible,
      isVisible,
    }
  },
})
</script>

<style lang="scss" scoped>
@use './_ItemDetails.scss';
</style>
