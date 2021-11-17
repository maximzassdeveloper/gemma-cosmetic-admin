import { useState, useEffect } from 'react'
import { Table, Image } from 'antd'
import { Container, List } from '../../components'
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/product'
import { fetchData } from '../../services/fetchData'
import { SERVER_URL } from '../../helper/config'

const { Column } = Table

export const Products: React.FC = () => { 

  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    const data = await fetchData({url: '/products'})
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteHandler = async (id: number) => {
    await fetchData({ url: `/products/delete/${id}`, type: 'delete' })
    setProducts(products?.filter(p => p.id !== id))
  }

  return (
    <Container title={'Все товары'}>
      <List data={products} loading={loading} onDelete={deleteHandler}>
        <Column 
          title='Название' 
          dataIndex='name'  
          render={(text, record: IProduct) => (
            <Link to={`/products/product/${record.slug}`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                  style={{ objectFit: 'cover', marginRight: '5px' }} 
                  preview={false} 
                  width={60} 
                  height={60} 
                  src={SERVER_URL + '/' + record.images[0]?.url} 
                />
                <p style={{ marginLeft: '10px', fontSize: '15px' }} >{text}</p>
              </div>
            </Link>
          )} 
        />
        <Column 
          title='Цена' 
          dataIndex='price' 
          width='12%' 
          sorter={{compare: (a: IProduct, b) => a.price - b.price}} 
          render={text => text+' руб'}
        />
      </List>
    </Container>
  )
}