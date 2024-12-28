<template>
  <main>
    <nav role="navigation">
      <router-link to="/gw2Home/inventories">Inventories</router-link>
      <router-link to="/gw2Home/wallet">Wallet</router-link>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
main {
  position: relative;
  margin: 0 auto;
  max-width: 1020px;
  height: 800px;
  border-radius: 10px;
  text-align: center;
  font-size: 11px;
  color: white;
  display: flex;

  nav {
    width: 100px;
    height: 800px;
    background-color: var(--color-background-sand);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    a {
      display: block;
      padding: 10px 0;
      color: #141414;
      text-decoration: none;
      border-bottom: 1px solid #141414;
    }
  }

  section {
    color: var(--gw2-c-sand);
    width: 920px;
    height: 800px;
    overflow-x: hidden;
    padding: 10px 15px;
    background-color: var(--color-background-soft);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
