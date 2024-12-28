<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
main {
  height: 800px;
  overflow-x: hidden;
}
section {
  color: var(--gw2-c-sand);
  padding: 10px 15px 20px;
  background-color: var(--color-background-soft);
  // Left border radius, but the scroll bar is hiding the curves :(
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
