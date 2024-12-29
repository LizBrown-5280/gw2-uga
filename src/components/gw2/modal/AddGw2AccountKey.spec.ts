import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AddGw2AccountKey from '@/components/gw2/modal/AddGw2AccountKey.vue'
import { createTestingPinia } from '@pinia/testing'
import { useGw2AccountKeysStore } from '@/stores/gw2AccountKeys'

describe('AddGw2AccountKey', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(AddGw2AccountKey, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays an error message for duplicate key', async () => {
    const store = useGw2AccountKeysStore()
    store.isDuplicateKey = vi.fn().mockReturnValue(true)

    await wrapper.find('#newAccountKey').setValue('duplicate-key')
    await wrapper.find('button').trigger('click')

    expect(store.isDuplicateKey).toHaveBeenCalledWith('duplicate-key')
    expect(wrapper.find('.error-container').text()).toContain('The key provided is a duplicate.')
  })

  it('adds a new key and resets the input fields', async () => {
    const store = useGw2AccountKeysStore()
    store.isDuplicateKey = vi.fn().mockReturnValue(false)
    store.addAccountKey = vi.fn()

    await wrapper.find('#newAccountKey').setValue('new-key')
    await wrapper.find('#newAccountKeyName').setValue('New Key Name')
    await wrapper.find('button').trigger('click')

    expect(store.isDuplicateKey).toHaveBeenCalledWith('new-key')
    expect(store.addAccountKey).toHaveBeenCalledWith({ name: 'New Key Name', key: 'new-key' })
    expect((wrapper.find('#newAccountKey').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('#newAccountKeyName').element as HTMLInputElement).value).toBe('')
  })

  it('limits the name length to 15 characters', async () => {
    await wrapper.find('#newAccountKeyName').setValue('This is a very long name')
    expect((wrapper.find('#newAccountKeyName').element as HTMLInputElement).value.length).toBe(15)
  })
})
