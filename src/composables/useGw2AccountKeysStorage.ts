import { ref } from 'vue'
import type { IGw2AccountKey } from '@/interfaces/Gw2Interfaces'

const gw2AccountKeys = ref<IGw2AccountKey[]>([])

export function useGw2AccountKeys() {
  const loadAccountKeys = () => {
    const storedKeys = localStorage.getItem('gw2AccountKeys')
    if (storedKeys) {
      gw2AccountKeys.value = JSON.parse(storedKeys)
    }
  }

  const saveAccountKeys = () => {
    localStorage.setItem('gw2AccountKeys', JSON.stringify(gw2AccountKeys.value))
  }

  return {
    gw2AccountKeys,
    loadAccountKeys,
    saveAccountKeys,
  }
}
