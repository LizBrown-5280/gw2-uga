<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <button class="close" @click="close"><IconClose /></button>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import IconClose from './icons/IconCloseX.vue'
import { ref } from 'vue'
const emit = defineEmits(['close'])
const isVisible = ref(true)

const close = () => {
  isVisible.value = false
  emit('close')
}
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8); /* Dark background for overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it appears above other content */
}
.modal-container {
  position: relative;
  background: white;
  padding: 30px 20px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
  border: 0px solid black;
  background: transparent;
  margin: 0px;
  padding: 10px;

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
