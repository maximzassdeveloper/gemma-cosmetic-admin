import { FC, useState, useEffect } from 'react'
import { 
  Table, Button, Row, Col, Card, Form, Input, Typography 
} from 'antd'
import { validateMessages } from '../helper/validationMes'
import { Container } from '../components'
import { ICategory } from '../types/product'
import { fetchData } from '../services/fetchData'

const { Column } = Table

export const Categories: FC = () => {

  const [cats, setCats] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)

  const getCats = async () => {
    setLoading(true)
    const data = await fetchData({url: '/categories'})
    setCats(data)
    setLoading(false)
  }

  useEffect(() => {
    getCats()
  }, [])

  const deleteHandler = async (id: number) => {
    await fetchData({ url: `/categories/delete/${id}`, type: 'delete' })
    setCats(cats.filter(p => p.id !== id))
  }

  const createHandler = async (data: any) => {
    const newCat = await fetchData({ url: `/categories/create`, type: 'post', data })
    if (!newCat) return
    setCats([newCat, ...cats]) 
  }

  return (
    <Container title={'Все категории'}>
      <Row gutter={20}>
        <Col span={8}>
          <Card>
            <Form
              onFinish={createHandler}
              validateMessages={validateMessages}
            >
              <Typography.Title level={4}>Создание категории</Typography.Title>
              <Form.Item name='name' rules={[{ required: true }]}>
                <Input placeholder='Название' />
              </Form.Item>
              <Form.Item name='slug'>
                <Input placeholder='Слаг' />
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' type='primary'>Создать</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={16}>
          <Table 
            dataSource={cats}
            sticky
            tableLayout='auto'
            loading={loading}
          >
            <Column 
              title='Id' 
              dataIndex='id' 
              width='5%' 
            />
            <Column 
              title='Название' 
              dataIndex='name' 
              width='20%' 
            />
            <Column 
              title='Слаг' 
              dataIndex='slug' 
              width='20%' 
            />
            <Column 
              title='Дата' 
              dataIndex='date' 
              width='18%' 
              render={(_, r: ICategory) => <p>
                  Обновлено {new Date(r.updatedAt).toLocaleDateString()}<br />
                  Опубликовано {new Date(r.createdAt).toLocaleDateString()}
                </p>} 
            />
            <Column 
              title='Действия' 
              dataIndex='delete' 
              width='10%' 
              render={(_, r: ICategory) => <>
                  <Button onClick={() => deleteHandler(r.id)}>Удалить</Button>
                </>} 
            />
          </Table>
        </Col>
      </Row>
    </Container>
  )
}