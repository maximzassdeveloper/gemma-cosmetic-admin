import { FC, useEffect, useState } from 'react'
import { Table, Image, Button } from 'antd'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import { arrayMoveImmutable } from 'array-move';
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../../helper/config'
import { IProduct } from '../../types/product'
import { Container } from '../../components';
import { fetchData } from '../../services/fetchData';

const arr: IProduct[] = []

export const Products: FC = () => {
  
  const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

  const columns: any[] = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      render: () => <DragHandle />
    }, {
      title: 'Id',
      dataIndex: 'id',
      width: '5%'
    }, {
      title: 'Название',
      dataIndex: 'name', 
      render: (value: any, record: IProduct) => (
        <Link to={`/products/product/${record.slug}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              style={{ objectFit: 'cover', marginRight: '5px' }} 
              preview={false} 
              width={60} 
              height={60} 
              src={SERVER_URL + '/' + record.images[0]?.url} 
            />
            <p style={{ marginLeft: '10px', fontSize: '15px' }} >{value}</p>
          </div>
        </Link>
      )
    }, {
      title: 'Цена', 
      dataIndex: 'price', 
      width: '12%',
      sorter: { compare: (a: IProduct, b: IProduct) => a.price - b.price }, 
      render: (text: any) => text + ' руб'
    }, {
      title: 'Дата', 
      dataIndex: 'date', 
      width: '18%', 
      render: (_: any, r: IProduct) => <p>
        Обновлено {new Date(r.updatedAt).toLocaleDateString()}<br />
        Опубликовано {new Date(r.createdAt).toLocaleDateString()}
      </p>
    }, {
      title: 'Действия', 
      dataIndex: 'delete', 
      width: '10%', 
      render: (_: any, r: any) => <>
        <Button onClick={() => onDelete(r.id)}>Удалить</Button>
      </>
    }
  ]

  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)

  const SortableItem = SortableElement((props: any) => <tr {...props} />)
  const SortableCont = SortableContainer((props: any) => <tbody {...props} />)

  const onSortEnd = async ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        arr.concat(products), 
        oldIndex, 
        newIndex
      ).filter((el: any) => !!el)
      
      setProducts(newData)
      
      const curProduct = products.find((_, i) => i === oldIndex)
      const sdProduct = products.find((_, i) => i === newIndex)
      if (!curProduct || !sdProduct) return
      await fetchData({ 
        url: `products/update/${curProduct.id}`,
        type: 'put',
        data: { index: newIndex }
      })
      await fetchData({ 
        url: `products/update/${sdProduct.id}`,
        type: 'put',
        data: { index: oldIndex }
      })
        
    }
  }

  const DraggableContainer = (props: any) => (
    <SortableCont
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = products.findIndex(x => x.index === restProps['data-row-key'])
    return <SortableItem index={index} {...restProps} />
  }

  async function onDelete(id: number) {
    await fetchData({ url: `/products/delete/${id}`, type: 'delete' })
    setProducts(products?.filter(p => p.id !== id))
  }

  const getProducts = async () => {
    setLoading(true)
    const data = await fetchData({ url: '/products' })
    if (!data) return setLoading(false)
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Container title='Товары'>
      <Table 
        dataSource={products}
        columns={columns}
        pagination={false}
        loading={loading}
        rowKey='index'
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      /> 
    </Container>
  )
}