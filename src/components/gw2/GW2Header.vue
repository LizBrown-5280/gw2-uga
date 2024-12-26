<template>
  <header>
    <div></div>
    <h1>Guild Wars 2 - Unofficial Game App</h1>
    <button @click="showModal = true">Manage Account Keys</button>
    <Modal v-if="showModal" @close="showModal = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from './modal/ManageAccountKeysModal.vue'

const showModal = ref(false)
</script>

<style scoped>
header {
  margin: 0 auto;
  max-width: 1020px;
  padding: 15px 15px;
  font-size: 11px;
  color: white;
  display: flex;
  justify-content: space-between;

  div {
    width: 173px;
  }
  h1 {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
}
</style>
