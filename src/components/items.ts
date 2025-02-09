export interface Item {
  id: number | null
  quantity: number | null
  image: string | null
  title: string | null
  description: string | null
}

import itemImage1 from '@/assets/images/_item1.png'
import itemImage2 from '@/assets/images/_item2.png'
import itemImage3 from '@/assets/images/_item3.png'

export const items: (Item | null)[] = [
  {
    id: 1,
    quantity: 4,
    image: itemImage1,
    title: 'Item 1',
    description: 'Description for Item 1',
  },
  {
    id: 2,
    quantity: 2,
    image: itemImage2,
    title: 'Item 2',
    description: 'Description for Item 2',
  },
  {
    id: 3,
    quantity: 5,
    image: itemImage3,
    title: 'Item 3',
    description: 'Description for Item 3',
  },
]
