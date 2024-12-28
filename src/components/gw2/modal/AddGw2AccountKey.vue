<script setup lang="ts">
import { ref } from 'vue'
import { useGw2AccountKeysStore } from '@/stores/gw2AccountKeys'
import type { IGw2AccountKey } from '@/interfaces/Gw2Interfaces'

const store = useGw2AccountKeysStore()

const newKey = ref<IGw2AccountKey>({
  name: '',
  key: '',
})

const isInvalidKey = ref(false)
const isDuplicateKey = ref(false)

const addKey = () => {
  isDuplicateKey.value = store.isDuplicateKey(newKey.value.key)
  if (isDuplicateKey.value) {
    console.error('Duplicate key:', newKey.value.key)
    return
  }

  store.addAccountKey(newKey.value)
  newKey.value = { name: '', key: '' } // Reset the input fields
}

const limitNameLength = () => {
  if (newKey.value.name.length > 15) {
    newKey.value.name = newKey.value.name.slice(0, 15)
  }
}
</script>

<template>
  <section>
    <h3>Enter your API key</h3>
    <div>
      <label for="newAccountKey">Account Key:</label>
      <input
        id="newAccountKey"
        class="sm-txt"
        v-model="newKey.key"
        type="text"
        placeholder="########-####-####-####-####################-####-####-####-############"
      />
      <div class="error-container">
        <p v-if="isInvalidKey" class="sm-txt">The key provided is invalid.</p>
        <p v-if="isDuplicateKey" class="sm-txt">The key provided is a duplicate.</p>
      </div>
    </div>

    <div>
      <label for="newAccountKeyName">Provide the key a name: <span class="sm-txt">(15 characters max)</span></label>
      <input
        id="newAccountKeyName"
        class="sm-txt width-auto-centered"
        v-model="newKey.name"
        @input="limitNameLength"
        type="text"
        placeholder="Account Key Name"
      />
    </div>
    <button @click="addKey">Use key & save</button>
    <!-- <button @click="useOnlyKey">Use key, but don't save</button> -->
    <p class="sm-txt">
      Saving the key will store it in your browser's local storage, allowing you to access it without needing to enter it again
      next time.
    </p>
  </section>
</template>

<style scoped lang="scss">
.modal-content {
  position: relative;
  background: var(--color-background-sand);
  width: 650px;
  color: var(--vt-c-text-light-2);
  text-align: center;
}
section {
  margin: 10px 0 15px;

  > div:last-of-type {
    margin-bottom: 10px;
  }
}
.sm-txt {
  font-size: small;
  line-height: 1.2;
}
.error-container {
  color: red;
  height: 15px;
}
input {
  width: 100%;
  text-align: center;
}
.icon-wrapper svg {
  width: 15px;
  height: 15px;
}
button {
  margin: 5px 5px 15px;
}
.width-auto-centered {
  display: block;
  margin: 0 auto;
  width: auto;
}
</style>
