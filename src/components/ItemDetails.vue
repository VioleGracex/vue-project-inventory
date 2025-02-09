<template>
  <div v-if="visible" :class="['item-details', { show: isVisible, hide: !isVisible }]">
    <div class="item-details-content">
      <div class="image-area">
        <img v-if="item?.image" :src="item?.image || undefined" alt="Изображение предмета" />
        <div v-else class="placeholder"></div>
      </div>
      <div class="details-area">
        <div class="separator"></div>
        <h2>
          {{ item?.title }}
          <small v-if="item?.quantity">({{ item?.quantity }})</small>
        </h2>
        <p>{{ item?.description }}</p>
      </div>
      <div class="actions-area">
        <div class="separator"></div>
        <button v-show="!confirmDelete" @click="confirmDelete = true" class="delete-button">
          Удалить
        </button>
        <div v-show="confirmDelete" class="delete-confirmation">
          <input
            type="number"
            placeholder="Введите количество"
            v-model="deleteQuantity"
            :max="item?.quantity ?? undefined"
            min="1"
            class="delete-input"
          />
          <div class="buttons">
            <button class="cancel-button" @click="confirmDelete = false">Отмена</button>
            <button class="confirm-button" @click="handleDelete">Подтвердить</button>
          </div>
        </div>
      </div>
    </div>
    <button class="close-button" @click="closeDetails">X</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { Item } from './items.ts'

export default defineComponent({
  name: 'ItemDetails',
  props: {
    item: {
      type: Object as () => Item | null,
      default: () => null,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'delete'],
  setup(props, { emit }) {
    const confirmDelete = ref(false)
    const deleteQuantity = ref<string | number>('') // Инициализация пустой строкой
    const visible = ref(false)
    const isVisible = ref(false)
    let timeoutId: number | null = null

    const clearCloseTimeout = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    watch(
      () => props.show,
      (newVal) => {
        if (newVal) {
          clearCloseTimeout()
          confirmDelete.value = false // Сбросить confirmDelete в false при показе деталей
          visible.value = true
          setTimeout(() => {
            isVisible.value = true
          }, 0)
        } else {
          isVisible.value = false
          timeoutId = setTimeout(() => {
            visible.value = false
            emit('close')
            timeoutId = null
          }, 600) // Задержка для синхронизации с анимацией закрытия
        }
      },
    )

    watch(
      () => props.item,
      () => {
        confirmDelete.value = false // Сбросить confirmDelete в false при изменении элемента
      },
    )

    const handleDelete = () => {
      const quantity = parseInt(deleteQuantity.value as string, 10)
      if (!isNaN(quantity)) {
        emit('delete', quantity)
      }
    }

    const closeDetails = () => {
      isVisible.value = false
      timeoutId = setTimeout(() => {
        visible.value = false
        emit('close')
        timeoutId = null
      }, 600) // Задержка для синхронизации с анимацией закрытия
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
