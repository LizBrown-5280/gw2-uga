<template>
  <main id="GuildWars2">
    <Header />

    <div class="contentWrapper">
      <aside>
        <Nav />
      </aside>

      <Main />
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import Header from '../components/gw2/GW2Header.vue'
import Nav from '../components/gw2/GW2Nav.vue'
import Main from '../components/gw2/GW2Main.vue'
import Footer from '../components/gw2/GW2Footer.vue'
</script>

<style scoped>
.contentWrapper {
  position: relative;
  text-align: center;
  display: flex;
}
aside {
  min-width: 100px;
  background-color: var(--color-background-sand);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
