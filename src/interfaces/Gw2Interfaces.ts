export interface IGw2AccountKey {
  name: string
  key: string
  selected?: boolean
}
export interface IGw2Currency {
  description: string
  icon: string
  id: number
  name: string
  order: number
}

export interface IGw2Wallet extends IGw2Currency {
  value: number
}
