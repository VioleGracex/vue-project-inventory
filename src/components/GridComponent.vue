<template>
  <div :class="['grid-container', { scrollable: isScrollable }]">
    <div class="grid-background"></div>
    <div class="grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="['grid-cell', { dragging: draggedIndex === index }]"
        @dragover="onDragOver($event)"
        @drop="onDrop($event, index)"
        @click="openItemDetails(item, index)"
      >
        <div
          v-if="item"
          :class="[
            'grid-item-wrapper',
            {
              'selected-item': selectedItemIndex === index,
              'dragging-item': draggedIndex === index,
            },
          ]"
          :draggable="true"
          @dragstart="onDragStart($event, index)"
          @dragend="onDragEnd"
        >
          <div class="grid-item">
            <img :src="item.image || undefined" alt="Item Image" class="item-image" />
            <div class="quantity-box">{{ item.quantity }}</div>
          </div>
        </div>
        <div v-else class="empty-cell"></div>
      </div>
    </div>
    <ItemDetails
      :item="selectedItem"
      :show="showItemDetails"
      @close="closeItemDetails"
      @delete="deleteItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { items } from './items.ts'
import ItemDetails from './ItemDetails.vue'
import type { Item } from './items.ts'

export default defineComponent({
  name: 'GridComponent',
  components: {
    ItemDetails,
  },
  setup() {
    const initialItems = new Array<Item | null>(25)
      .fill(null)
      .map((_, index) => items[index] || null)
    const state = reactive({
      items: initialItems,
      draggedIndex: null as number | null,
      showItemDetails: false,
      selectedItem: null as Item | null,
      selectedItemIndex: null as number | null,
    })

    if (items.length > 25) {
      state.items = items
    }

    const onDragStart = (event: DragEvent, index: number) => {
      state.draggedIndex = index
      event.dataTransfer?.setData('text/plain', index.toString())
      // Close item details and remove selected item
      state.showItemDetails = false
      state.selectedItemIndex = null
    }

    const onDragOver = (event: DragEvent) => {
      event.preventDefault()
    }

    const onDrop = (event: DragEvent, index: number) => {
      event.preventDefault()
      const draggedIndex = parseInt(event.dataTransfer?.getData('text/plain') || '', 10)
      if (isNaN(draggedIndex) || draggedIndex === index) return

      // Move the item to the new position
      const draggedItem = state.items[draggedIndex]
      state.items[draggedIndex] = state.items[index]
      state.items[index] = draggedItem

      // Reset the dragged index
      state.draggedIndex = null
    }

    const onDragEnd = () => {
      state.draggedIndex = null
    }

    const isScrollable = computed(() => state.items.length > 25)

    const openItemDetails = (item: Item | null, index: number) => {
      if (item) {
        state.selectedItem = { ...item } // Ensure a new object reference is created
        state.selectedItemIndex = index
        state.showItemDetails = true
      }
    }

    const closeItemDetails = () => {
      state.showItemDetails = false
      state.selectedItemIndex = null
    }

    const deleteItem = (quantity: number) => {
      const selectedItemIndex = state.selectedItemIndex
      if (state.selectedItem && quantity > 0 && quantity <= (state.selectedItem.quantity || 0)) {
        if (selectedItemIndex !== null && state.items[selectedItemIndex]?.quantity) {
          state.items[selectedItemIndex]!.quantity! -= quantity
          if (state.items[selectedItemIndex]!.quantity === 0) {
            state.items[selectedItemIndex] = null
          }
          state.showItemDetails = false
          state.selectedItemIndex = null
        }
      }
    }

    return {
      ...toRefs(state),
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
      isScrollable,
      openItemDetails,
      closeItemDetails,
      deleteItem,
    }
  },
})
</script>

<style lang="scss" scoped>
@use './_GridComponent.scss';
</style>
