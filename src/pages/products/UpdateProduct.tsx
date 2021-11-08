import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Loader, Product } from '../../components'
import { fetchData } from '../../services/fetchData'
import { IProduct } from '../../types/product'

export const UpdateProduct: FC = () => {

  const [product, setProduct] = useState<any>()
  const [loading, setloading] = useState(true)
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    (async () => {
      if (!slug) return
      setloading(true)
      const data = await fetchData({url: `/products/product/${slug}`})
      setProduct(data)
      setloading(false)
    })()
  }, [])

  const onSubmit = async (data: any) => {
    await fetchData({ url: `/products/update/${product.id}`, type: 'put', data })
  }

  return <>
    {loading 
      ? <Loader />
      : <Product 
          title='Изменение товара'
          buttonText='Обновить'
          data={product} 
          onSubmit={onSubmit} 
        />
    }
  </>
}