<template>
  <header>Header</header>
  <Modal />
</template>

<script setup lang="ts">
import Modal from './modal/ManageAccountKeysModal.vue'
</script>

<style scoped>
footer {
  z-index: 15;
  position: relative;
  margin: 0 auto;
  max-width: 1020px;
  padding: 15px 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  font-size: 11px;
  color: white;
}
</style>
