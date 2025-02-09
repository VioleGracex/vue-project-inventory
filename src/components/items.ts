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
    title: 'Предмет 1',
    description: 'Описание для Предмета 1',
  },
  {
    id: 2,
    quantity: 2,
    image: itemImage2,
    title: 'Предмет 2',
    description: 'Описание для Предмета 2',
  },
  {
    id: 3,
    quantity: 5,
    image: itemImage3,
    title: 'Предмет 3',
    description: 'Описание для Предмета 3',
  },
]
