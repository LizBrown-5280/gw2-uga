import { defineStore } from 'pinia'
import type { IGw2AccountKey } from '@/interfaces/Gw2Interfaces'
import { useGw2AccountKeys } from '@/composables/useGw2AccountKeysStorage'

export const useGw2AccountKeysStore = defineStore('gw2AccountKeys', {
  state: () => ({
    gw2AccountKeys: [] as IGw2AccountKey[],
    selectedAccountKey: '',
  }),
  actions: {
    addAccountKey(newKey: IGw2AccountKey) {
      // If there are no keys, set the new key as selected key
      if (this.gw2AccountKeys.length === 0) {
        newKey.selected = true
      }
      this.gw2AccountKeys.push(newKey)
      this.updateAndSaveAccountKeysToLocal()
    },
    removeAccountKey(key: string) {
      this.gw2AccountKeys = this.gw2AccountKeys.filter((accountKey) => accountKey.key !== key)
      const hasSelectedKey = this.gw2AccountKeys.some((accountKey) => accountKey.selected)
      if (!hasSelectedKey) {
        this.setAutoDefaultKey()
      } else {
        this.updateAndSaveAccountKeysToLocal()
      }
    },
    loadAccountKeys() {
      const { loadAccountKeys, gw2AccountKeys } = useGw2AccountKeys()
      loadAccountKeys()
      this.gw2AccountKeys = gw2AccountKeys.value
    },
    isDuplicateKey(key: string): boolean {
      return this.gw2AccountKeys.some((accountKey) => accountKey.key === key)
    },
    isInvalidKey(key: string): boolean {
      //! Needs to be built out to check if the key is valid, template is ready
      return false
    },
    setUserDefaultKey(key: string) {
      this.selectedAccountKey = ''
      this.gw2AccountKeys.forEach((accountKey) => {
        accountKey.selected = accountKey.key === key
        if (accountKey.selected) {
          this.selectedAccountKey = key
        }
      })
      this.updateAndSaveAccountKeysToLocal()
    },
    setAutoDefaultKey() {
      this.selectedAccountKey = ''
      if (this.gw2AccountKeys.length > 0) {
        this.gw2AccountKeys[0].selected = true
        this.selectedAccountKey = this.gw2AccountKeys[0].key
      }
      this.updateAndSaveAccountKeysToLocal()
    },
    updateAndSaveAccountKeysToLocal() {
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
