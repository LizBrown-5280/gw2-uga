<template>
  <footer>
    <div class="gw2Logos">
      <a href="https://www.arena.net/en">
        <img src="@/assets/gw2/images/ArenaNet_LogoFrgb_Sm250.jpg" width="140" />
      </a>
      <a href="https://www.guildwars2.com/en/">
        <img src="@/assets/gw2/images/GW2_Logo.png" width="140" />
      </a>
      <a href="https://heartofthorns.guildwars2.com/">
        <img src="@/assets/gw2/images/GW2-HoT_Texture_Centered_Trans_R.png" width="140" />
      </a>
      <a href="https://www.guildwars2.com/en/path-of-fire/">
        <img src="@/assets/gw2/images/GW2-PoF_Texture_Centered_Trans.png" width="140" />
      </a>
    </div>

    <p>
      &copy; 2015 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC logo, ArenaNet, Guild Wars, Guild Wars
      Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guild Wars 2, Heart of Thorns, and all associated
      logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the
      property of their respective owners.
    </p>
  </footer>
</template>

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

.gw2Logos {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 580px;
  height: 115px;
  margin: 0 auto 10px;
  background-color: white;
  border-radius: 5px;
}
</style>
