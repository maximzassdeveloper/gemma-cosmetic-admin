import { Card, Table } from 'antd'
import { FC, useEffect, useState } from 'react'
import { Container, List } from '../components'
import { fetchData } from '../services/fetchData'
import { IAttribute } from '../types/product'

export const Attributes: FC = () => {

  const [attrs, setAttrs] = useState<IAttribute[]>([])
  const [loading, setLoading] = useState(false)

  const deleteHandler = async (id: number) => {
    await fetchData({ url: `/attributes/delete/${id}`, type: 'delete' })
    setAttrs(attrs.filter(x => x.id !== id))
  }

  const getAttrs = async () => {
    setLoading(true)
    const data = await fetchData({ url: '/attributes', type: 'get' }) || []
    setAttrs(data)
    setLoading(false)
  }

  useEffect(() => {
    getAttrs()
  }, [])

  return (
    <Container title='Атрибуты'>
      <List data={attrs} loading={loading} onDelete={deleteHandler}>
        <Table.Column title='Название' dataIndex='name' />
      </List>
    </Container>
  )
}