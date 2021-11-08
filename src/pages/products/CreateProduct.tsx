import { FC } from 'react'
import { fetchData } from '../../services/fetchData'
import { Product } from '../../components'

export const CreateProduct: FC = () => {

  const onSubmit = async (data: any) => {
    await fetchData({ url: '/products/create', type: 'post', data })
  }

  return (
    <>
      <Product 
        title={'Создание товара'}
        buttonText={'Создать'}
        onSubmit={onSubmit} 
      />
    </>
  )
}