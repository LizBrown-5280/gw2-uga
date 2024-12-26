import { ref } from 'vue'
import type { IGw2AccountKey } from '@/types/Gw2Types.ts'

const gw2AccountKeys = ref<IGw2AccountKey[]>([])

export function useGw2AccountKeys() {
  const loadAccountKeys = () => {
    const storedKeys = localStorage.getItem('gw2AccountKeys')
    if (storedKeys) {
      console.log('storedKeys', storedKeys)
      gw2AccountKeys.value = JSON.parse(storedKeys)
      console.log('gw2AccountKeys', gw2AccountKeys.value)
    }
  }

  const saveAccountKeys = () => {
    console.log('saveAccountKeys', gw2AccountKeys.value)
    localStorage.setItem('gw2AccountKeys', JSON.stringify(gw2AccountKeys.value))
  }

  return {
    gw2AccountKeys,
    loadAccountKeys,
    saveAccountKeys,
  }
}
