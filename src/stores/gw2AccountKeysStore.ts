import { defineStore } from 'pinia'
import type { IGw2AccountKey } from '@/interfaces/Gw2Interfaces'
import { useGw2AccountKeysStorage } from '@/composables/useGw2AccountKeysStorage'

export const useGw2AccountKeysStore = defineStore('gw2AccountKeys', {
  state: () => ({
    gw2AccountKeys: [] as IGw2AccountKey[],
    gw2SelectedAccountKey: '',
  }),
  actions: {
    loadAccountKeys() {
      const { getAccountKeys, gw2AccountKeysStored } = useGw2AccountKeysStorage()
      getAccountKeys()
      this.gw2AccountKeys = gw2AccountKeysStored.value
      this.findDefaultKey()
    },
    findDefaultKey() {
      // after initial load, set the default key, if any
      this.gw2SelectedAccountKey = this.gw2AccountKeys.find((accountKey) => accountKey.selected)?.key || ''
    },

    addAccountKey(newKey: IGw2AccountKey) {
      this.gw2AccountKeys.push(newKey)
      if (this.gw2AccountKeys.length === 1) this.setAutoDefaultKey()
      this.updateAndSaveAccountKeysToLocal()
    },
    removeAccountKey(key: string) {
      this.gw2AccountKeys = this.gw2AccountKeys.filter((accountKey) => accountKey.key !== key)
      const hasSelectedKey = this.gw2AccountKeys.some((accountKey) => accountKey.selected)
      if (!hasSelectedKey) this.setAutoDefaultKey()
      this.updateAndSaveAccountKeysToLocal()
    },
    setAutoDefaultKey() {
      // when adding 1st key or removing a default key, set the first key as default
      this.gw2SelectedAccountKey = ''
      if (this.gw2AccountKeys.length > 0) {
        this.gw2AccountKeys[0].selected = true
        this.gw2SelectedAccountKey = this.gw2AccountKeys[0].key
      }
    },
    setUserDefaultKey(key: string) {
      this.gw2SelectedAccountKey = ''
      this.gw2AccountKeys.forEach((accountKey) => {
        accountKey.selected = accountKey.key === key
        if (accountKey.selected) {
          this.gw2SelectedAccountKey = key
        }
      })
      this.updateAndSaveAccountKeysToLocal()
    },
    updateAndSaveAccountKeysToLocal() {
      const { setAccountKeys, gw2AccountKeysStored } = useGw2AccountKeysStorage()
      gw2AccountKeysStored.value = this.gw2AccountKeys
      setAccountKeys()
      console.log('Defualt key after storing:', this.gw2SelectedAccountKey)
    },

    isDuplicateKey(key: string): boolean {
      return this.gw2AccountKeys.some((accountKey) => accountKey.key === key)
    },
    isInvalidKey(key: string): boolean {
      //! Needs to be built out to check if the key is valid, template is ready
      return false
    },
  },
  getters: {
    getAccountKeys: (state) => state.gw2AccountKeys,
    getAccountKeyByName: (state) => (name: string) => {
      return state.gw2AccountKeys.find((accountKey) => accountKey.name === name)
    },
  },
})
