import { ref } from 'vue'
import type { IGw2AccountKey } from '@/interfaces/Gw2Interfaces'

const gw2AccountKeysStored = ref<IGw2AccountKey[]>([])

export function useGw2AccountKeysStorage() {
  const getAccountKeys = () => {
    const storedKeys = localStorage.getItem('gw2AccountKeys')
    if (storedKeys) {
      gw2AccountKeysStored.value = JSON.parse(storedKeys)
    }
  }

  const setAccountKeys = () => {
    localStorage.setItem('gw2AccountKeys', JSON.stringify(gw2AccountKeysStored.value))
  }

  return {
    gw2AccountKeysStored,
    getAccountKeys,
    setAccountKeys,
  }
}
