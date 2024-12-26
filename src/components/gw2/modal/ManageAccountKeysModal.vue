<template>
  <ModalContainer>
    <div class="modal-content">
      <header>
        <h2>Manage Account API Keys</h2>
        <p class="sm-txt">
          Keys can be retreived from
          <a href="https://account.arena.net/applications" target="_blank">ArenaNet's API Key Management</a> page.
        </p>
      </header>

      <SelectKey />
      <AddKey />
    </div>
  </ModalContainer>
</template>

<script setup lang="ts">
import ModalContainer from '../../ModalContainer.vue'
import SelectKey from './SelectDefaultGw2AccountKey.vue'
import AddKey from './AddGw2AccountKey.vue'
</script>

<style scoped lang="scss">
.modal-content {
  width: 680px;
}
.sm-txt {
  font-size: small;
  line-height: 1.2;
}
</style>
