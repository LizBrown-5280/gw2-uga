import axios from 'axios'
import { ref } from 'vue'
import type { IGw2Wallet } from '@/interfaces/Gw2Interfaces'

axios.defaults.baseURL = 'https://api.guildwars2.com'

export function useApi() {
  console.log('***** using API - fetch data')
  const data = ref<IGw2Wallet[] | null>(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async (url: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(url)
      data.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
