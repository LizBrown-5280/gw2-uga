<template>
  <div id="wallet">
    <h2>All {{ mergedData.length - 1 }} Currencies</h2>
    <ul v-if="!loading">
      <li v-for="currency in mergedData" :key="currency.id">
        <template v-if="isSpecialCurrency(currency)">
          <div class="col col1 img-lg">
            <img :src="currency.icon" :alt="currency.name" />
          </div>
          <div class="col col2 img-sm" v-if="isWalletData">
            <span>{{ goldPart(currency.value) }}<img :src="goldIcon" alt="gold" /></span>
            <span>{{ silverPart(currency.value) }}<img :src="silverIcon" alt="silver" /></span>
            <span>{{ copperPart(currency.value) }}<img :src="copperIcon" alt="copper" /></span>
          </div>
          <div class="col col3">
            <span>{{ currency.name }}:</span> {{ currency.description }}
          </div>
        </template>

        <template v-else>
          <div class="col col1 img-lg">
            <img :src="currency.icon" :alt="currency.name" />
          </div>
          <div class="col col2 img-sm" v-if="isWalletData">
            <span>{{ displayValue(currency) }}</span>
            <img :src="currency.icon" :alt="currency.name" />
          </div>
          <div class="col col3">
            <span>{{ currency.name }}:</span>
            {{ currency.description }}
          </div>
        </template>
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useGw2AccountKeysStore } from '@/stores/gw2AccountKeys'
import type { IGw2Wallet } from '@/interfaces/Gw2Interfaces'

// API data and loading/error states
const { data: currenciesData, error: currenciesError, loading: currenciesLoading, fetchData: fetchCurrencies } = useApi()
const { data: walletData, error: walletError, loading: walletLoading, fetchData: fetchWallet } = useApi()

// Store and selected account key
const store = useGw2AccountKeysStore()
const selectedAccountKey = computed(() => store.selectedAccountKey)

// Combined loading and error states
const loading = computed(() => currenciesLoading.value || walletLoading.value)
const error = computed<Error | null>(() => currenciesError.value || walletError.value)

// Fetch data on component mount
onMounted(async () => {
  try {
    await Promise.all([
      fetchCurrencies('/v2/currencies?ids=all'),
      fetchWallet(`/v2/account/wallet?access_token=${selectedAccountKey.value}`),
    ])
  } catch (err) {
    console.error(err)
  }
})

const mergedData = computed(() => {
  if (currenciesData.value) {
    const walletMap = walletData.value ? new Map(walletData.value.map((item) => [item.id, item])) : new Map()

    return (currenciesData.value as IGw2Wallet[])
      .map((currency) => {
        const walletItem = walletMap.get(currency.id)
        return walletItem ? { ...currency, value: walletItem.value } : currency
      })
      .filter((currency) => currency.id !== 74) // Filter out currency with id 74, a duplicate of another
      .sort((a, b) => a.order - b.order)
  }
  return []
})

const isWalletData = computed(() => {
  return walletData.value ? true : false
})

// Helper methods
const isSpecialCurrency = (currency: IGw2Wallet) => currency.id === 1
const displayValue = (currency: IGw2Wallet) => new Intl.NumberFormat().format(currency.value ?? 0)

// Helper methods for Coin currency value parts
const goldPart = (value: number) => Math.floor(value / 10000)
const silverPart = (value: number) => Math.floor((value % 10000) / 100)
const copperPart = (value: number) => value % 100

//Additional icon URLs
const copperIcon = 'https://render.guildwars2.com/file/6CF8F96A3299CFC75D5CC90617C3C70331A1EF0E/156902.png'
const silverIcon = 'https://render.guildwars2.com/file/E5A2197D78ECE4AE0349C8B3710D033D22DB0DA6/156907.png'
const goldIcon = 'https://render.guildwars2.com/file/090A980A96D39FD36FBB004903644C6DBEFB1FFB/156904.png'
</script>

<style scoped>
#wallet {
  /* height: 800px;
  overflow-x: hidden; */
}
li {
  padding: 10px 5px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
}
li:nth-child(even) {
  background-color: var(--color-background-sand-dark);
}
.col {
  flex: 1;
}
.col2 {
  flex: 3;
  text-align: right;
  padding-right: 20px;
}
.col3 {
  flex-grow: 18;
}
/* This height sets the overall li height */

.img-lg,
.img-lg img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.img-sm img {
  width: 20px;
  height: 20px;
  margin: 0 2px;
}
.img-sm img {
  vertical-align: text-bottom;
}
span {
  margin-right: 5px;
  font-size: 16px;
  font-weight: bold;
}
</style>
