import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useGw2WalletStore = defineStore('gw2WalletData', () => {
  const { data: currenciesData, fetchData: fetchCurrencies } = useApi()
  const { data: walletData, fetchData: fetchWallet } = useApi()
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchAllData = async (accessToken: string) => {
    loading.value = true
    error.value = null
    console.log('fetching data')
    try {
      if (accessToken) {
        await Promise.all([
          fetchCurrencies('/v2/currencies?ids=all'),
          fetchWallet(`/v2/account/wallet?access_token=${accessToken}`),
        ])
      } else {
        await fetchCurrencies('/v2/currencies?ids=all')
      }
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  return {
    currenciesData,
    walletData,
    loading,
    error,
    fetchAllData,
  }
})
