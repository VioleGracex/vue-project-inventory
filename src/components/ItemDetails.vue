<template>
  <div v-if="visible" :class="['item-details', { 'show': isVisible, 'hide': !isVisible }]">
    <div class="item-details-content">
      <h2>{{ item?.title }}</h2>
      <img :src="item?.image" alt="Item Image" />
      <p>{{ item?.description }}</p>
      <button @click="confirmDelete = true">Delete</button>
      <div v-if="confirmDelete" class="delete-confirmation">
        <p>Select quantity to delete:</p>
        <input type="number" v-model="deleteQuantity" :max="item?.quantity" min="1" />
        <div class="buttons">
          <button class="cancel" @click="confirmDelete = false">Cancel</button>
          <button class="confirm" @click="handleDelete">Confirm</button>
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
