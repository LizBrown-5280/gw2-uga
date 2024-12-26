import { defineStore } from 'pinia'
import type { IGw2AccountKey } from '@/types/Gw2Types.ts'
import { useGw2AccountKeys } from '@/composables/useGw2AccountKeys'

export const useGw2AccountKeysStore = defineStore('gw2AccountKeys', {
  state: () => ({
    gw2AccountKeys: [] as IGw2AccountKey[],
  }),
  actions: {
    addAccountKey(newKey: IGw2AccountKey) {
      if (this.gw2AccountKeys.length === 0) {
        newKey.selected = true
      }
      this.gw2AccountKeys.push(newKey)
      const { saveAccountKeys, gw2AccountKeys } = useGw2AccountKeys()
      gw2AccountKeys.value = this.gw2AccountKeys
      saveAccountKeys()
    },
    removeAccountKey(key: string) {
      this.gw2AccountKeys = this.gw2AccountKeys.filter((accountKey) => accountKey.key !== key)
      const { saveAccountKeys, gw2AccountKeys } = useGw2AccountKeys()
      gw2AccountKeys.value = this.gw2AccountKeys
      saveAccountKeys()
    },
    loadAccountKeys() {
      const { loadAccountKeys, gw2AccountKeys } = useGw2AccountKeys()
      loadAccountKeys()
      this.gw2AccountKeys = gw2AccountKeys.value
    },
    isDuplicateKey(key: string): boolean {
      return this.gw2AccountKeys.some((accountKey) => accountKey.key === key)
    },
    setDefaultKey(key: string) {
      this.gw2AccountKeys.forEach((accountKey) => {
        accountKey.selected = accountKey.key === key
      })
      const { saveAccountKeys, gw2AccountKeys } = useGw2AccountKeys()
      gw2AccountKeys.value = this.gw2AccountKeys
      saveAccountKeys()
    },
  },
  getters: {
    getAccountKeys: (state) => state.gw2AccountKeys,
    getAccountKeyByName: (state) => (name: string) => {
      return state.gw2AccountKeys.find((accountKey) => accountKey.name === name)
    },
  },
})
