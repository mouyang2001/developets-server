interface Accessory {
  name: string
  media: string
  orgId: string

  cost: number

  accessoryId: number
  accessorySeries: number
}

interface MarketAccessory {
  amount: number
  accessory: Accessory
}


const accessories: Accessory[] = [
  {
    name: 'Glasses',
    media: '',
    orgId: null,
    cost: 10,
    accessoryId: 20,
    accessorySeries: null,
  },

  {
    name: 'Eyepatch',
    media: '',
    orgId: null,
    cost: 10,
    accessoryId: 21,
    accessorySeries: null,
  },

  {
    name: 'Santa hat',
    media: '',
    orgId: null,
    cost: 10,
    accessoryId: 22,
    accessorySeries: null,
  },
];
