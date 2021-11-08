import React from 'react'
import { Table, Image, Button } from 'antd'
import { Container } from '../../components'
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/product'
import { fetchData } from '../../services/fetchData'
import { SERVER_URL } from '../../helper/config'

const { Column } = Table

export const Products: React.FC = () => {

  const [products, setProducts] = React.useState<IProduct[] | null>(null)

  const getProducts = async () => {
    const data = await fetchData({url: '/products'})
    setProducts(data)
  }

  React.useEffect(() => {
    if (!products) getProducts()
    return () => setProducts(null)
  }, [])

  const deleteHandler = async (id: number) => {
    await fetchData({ url: `/products/delete/${id}`, type: 'delete' })
    setProducts(products?.filter(p => p.id !== id) || [])
  }

  return (
    <Container title={'Все товары'}>
      <Table 
        dataSource={products || []}
        sticky
        tableLayout='auto'
      >
        <Column 
          title='Id' 
          dataIndex='id' 
          width='5%' 
        />
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
        <Column 
          title='Дата' 
          dataIndex='date' 
          width='16%' 
          render={(_, r: IProduct) => <p>
              Обновлено {new Date(r.updatedAt).toLocaleDateString()}<br />
              Опубликовано {new Date(r.createdAt).toLocaleDateString()}
            </p>} 
        />
        <Column 
          title='Действия' 
          dataIndex='delete' 
          width='10%' 
          render={(_, r: IProduct) => <>
              <Button onClick={() => deleteHandler(r.id)}>Удалить</Button>
            </>} 
        />
      </Table>
    </Container>
  )
}