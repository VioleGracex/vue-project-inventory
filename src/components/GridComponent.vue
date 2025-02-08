<template>
  <div class="grid-container">
    <div class="grid-background"></div>
    <div class="grid">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="grid-cell"
        @dragover="onDragOver($event)"
        @drop="onDrop($event, index)"
      >
        <div
          v-if="item"
          class="grid-item"
          :draggable="true"
          :style="{ backgroundColor: item.color }"
          @dragstart="onDragStart($event, index)"
        >
          <div class="drag-hook">:::</div>
        </div>
        <div v-else class="empty-cell"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'GridComponent',
  setup() {
    const state = reactive({
      items: [
        { id: 1, color: '#ff9999' },
        { id: 2, color: '#99ff99' },
        { id: 3, color: '#9999ff' },
        { id: 4, color: '#ffff99' },
        { id: 5, color: '#ff99ff' },
        { id: 6, color: '#99ffff' },
        { id: 7, color: '#ff6666' },
        { id: 8, color: '#66ff66' },
        { id: 9, color: '#6666ff' },
        { id: 10, color: '#ffcc99' },
        null,
        null,
        null,
        null,
        null,
        { id: 11, color: '#ff9999' },
        { id: 12, color: '#99ff99' },
        { id: 13, color: '#9999ff' },
        { id: 14, color: '#ffff99' },
        { id: 15, color: '#ff99ff' },
        { id: 16, color: '#99ffff' },
        { id: 17, color: '#ff6666' },
        { id: 18, color: '#66ff66' },
        { id: 19, color: '#6666ff' },
        { id: 20, color: '#ffcc99' },
        { id: 21, color: '#ff9999' },
        { id: 22, color: '#99ff99' },
        { id: 23, color: '#9999ff' },
        { id: 24, color: '#ffff99' },
        { id: 25, color: '#ff99ff' },
        { id: 26, color: '#99ffff' },
        { id: 27, color: '#ff6666' },
        { id: 28, color: '#66ff66' },
        { id: 29, color: '#6666ff' },
        { id: 30, color: '#ffcc99' },
      ],
      draggedIndex: null,
    });

    const onDragStart = (event: DragEvent, index: number) => {
      state.draggedIndex = index;
      event.dataTransfer?.setData('text/plain', index.toString());
    };

    const onDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const onDrop = (event: DragEvent, index: number) => {
      event.preventDefault();
      const draggedIndex = state.draggedIndex;
      if (draggedIndex === null || draggedIndex === index) return;

      // Move the item to the new position
      const draggedItem = state.items[draggedIndex];
      state.items[draggedIndex] = state.items[index];
      state.items[index] = draggedItem;

      // Reset the dragged index
      state.draggedIndex = null;
    };

    return {
      ...toRefs(state),
      onDragStart,
      onDragOver,
      onDrop,
    };
  },
});
</script>

<style scoped>
.grid-container {
  position: relative;
  width: calc(105px * 5);
  max-height: calc(100px * 5);
  background: #4d4d4d;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.grid-container::-webkit-scrollbar {
  width: 8px;
}

.grid-container::-webkit-scrollbar-track {
  background: #4d4d4d;
  border-radius: 10px;
}

.grid-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.grid-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.grid-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-image: linear-gradient(to right, #ccc 1px, transparent 1px),
    linear-gradient(to bottom, #ccc 1px, transparent 1px);
  background-size: 105px 100px;
  pointer-events: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 105px);
  grid-auto-rows: 100px;
  gap: 0;
  position: relative;
  z-index: 1;
}

.grid-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 100px;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 85px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: grab;
}

.empty-cell {
  width: 90px;
  height: 85px;
}

.drag-hook {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  user-select: none;
}

.grid-item[draggable='true'] {
  cursor: grabbing;
}
</style>
