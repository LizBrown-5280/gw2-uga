<template>
  <section v-if="accountKeys.length">
    <h3>Select Default GW2 Account Key</h3>
    <ul class="sm-txt no-bullets">
      <li v-for="key in accountKeys" :key="key.key">
        <input type="radio" :id="key.key" :value="key.key" v-model="selectedKey" @change="setDefaultKey(key.key)" />
        <label>{{ key.name }}: {{ key.key }}</label>
        <button @click="confirmRemoveKey(key.key)"><IconCross /></button>
        <span class="icon-wrapper" v-show="isValidKey"><IconCheck /></span>
      </li>
    </ul>
  </section>

  <ModalContainer v-if="showModal" @close="showModal = false">
    <div class="modal-content">
      <p>Are you sure you want to remove this key?</p>
      <button @click="removeKey">Yes</button>
      <button @click="showModal = false">No</button>
    </div>
  </ModalContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGw2AccountKeysStore } from '@/stores/gw2AccountKeys'
import IconCheck from '../icons/IconCheckGreenCircle.vue'
import IconCross from '../icons/IconCrossRedCircle.vue'
import ModalContainer from '@/components/ModalContainer.vue'

const store = useGw2AccountKeysStore()

onMounted(() => {
  store.loadAccountKeys()
})

const accountKeys = computed(() => store.gw2AccountKeys)
const isValidKey = ref()
const selectedKey = ref<string>('')
const showModal = ref(false)
const keyToRemove = ref<string>('')

//! Not sure if this is watcher is working as intended,
// 1.) it should update the selected key when the very first key is added
// 2.) it should update the selected key when a key is removed
watch(accountKeys, (newKeys) => {
  selectedKey.value = newKeys.find((key) => key.selected)?.key || ''
})

const setDefaultKey = (key: string) => {
  store.setUserDefaultKey(key)
}

const confirmRemoveKey = (key: string) => {
  keyToRemove.value = key
  showModal.value = true
}

const removeKey = () => {
  store.removeAccountKey(keyToRemove.value)
  if (selectedKey.value === keyToRemove.value) {
    selectedKey.value = ''
  }
  showModal.value = false
}
</script>

<style scoped lang="scss">
section {
  margin: 10px 0 15px;
}
input[type='radio'] {
  margin-right: 5px;
}
ul {
  li {
    display: flex;
    margin-bottom: 8px;

    label {
      flex: 1;
    }

    button {
      margin-left: 5px;
      background: transparent;
      border: none;
      width: 7px;
      height: 7px;
      color: green;

      svg {
        width: 13px;
        height: 13px;
      }
    }
  }
}
.sm-txt {
  font-size: small;
  line-height: 1.2;
}
.icon-wrapper svg {
  width: 15px;
  height: 15px;
}
</style>
