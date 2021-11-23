import { FC, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Rate, Row, Select, Table } from 'antd'
import { Container, FileUpload, List } from '../components'
import { IComment, IProduct } from '../types/product'
import { fetchData } from '../services/fetchData'
import { validateMessages } from '../helper/validationMes'

export const Reviews: FC = () => {

  const [reviews, setReviews] = useState<IComment[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [curReview, setCurReview] = useState<IComment | null>(null)
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const onDelete = async (id: number) => {
    await fetchData({ 
      url: `/comments/delete/${id}`,
      type: 'delete' 
    })
    setReviews(prev => prev.filter(x => x.id !== id))
  }

  const onUpdate = (id: number) => {
    const cur = reviews.find(x => x.id === id)
    if (!cur) return 
    setCurReview(cur)
    const fieldsData = [
      { name: 'name', value: cur.name },
      { name: 'message', value: cur.message },
      { name: 'rating', value: cur.rating },
      { name: 'productId', value: cur.productId },
      { name: 'files', value: cur.files?.map(x => x.url) },
    ]
    form.setFields(fieldsData)
  }

  const cancelReview = () => {
    setCurReview(null)
    form.resetFields()
  }

  const onSubmit = async (data: any) => {
    if (!curReview) {
      const newReview = await fetchData({
        url: '/comments/create',
        type: 'post',
        data
      })
      setReviews([newReview, ...reviews])
      form.resetFields()
    } else {
      const updatedReview = await fetchData({
        url: `/comments/update/${curReview.id}`,
        type: 'put',
        data
      })
      setReviews(reviews.map(x => x.id === updatedReview.id ? updatedReview : x))
    }
  }

  const getData = async () => {
    setLoading(true)
    const reviewsData = await fetchData({ url: '/comments' })
    const productsData = await fetchData({ url: '/products' })
    if (reviewsData) setReviews(reviewsData)
    if (productsData) setProducts(productsData)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container title='Отзывы'>

      <Card style={{ marginBottom: 20 }}>
        <Form 
          form={form} 
          validateMessages={validateMessages} 
          onFinish={onSubmit}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name='name' rules={[{ required: true }]}>
                <Input placeholder='Имя комментатора' />
              </Form.Item>
              <Form.Item name='message' rules={[{ required: true }]}>
                <Input.TextArea placeholder='Текст отзыва' rows={8} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='productId' rules={[{ required: true }]}>
                <Select placeholder='Товар'>
                  {products.map(pr => 
                    <Select.Option key={pr.id} value={pr.id}>{pr.name}</Select.Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item name='rating' rules={[{ required: true }]}>
                <Rate />
              </Form.Item>
              <Form.Item name='files'>
                <FileUpload files={curReview?.files} />
              </Form.Item>
              <Form.Item>
                <Row>
                  <Button htmlType='submit' type='primary'>
                    {!curReview ? 'Создать' : 'Обновить'}
                  </Button>
                  {!!curReview && <>
                    <Button 
                      style={{ marginLeft: 15 }} 
                      danger
                      onClick={cancelReview}
                    >
                      Отменить
                    </Button>
                  </>}
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <List 
        data={reviews} 
        loading={loading} 
        onDelete={onDelete}
        onUpdate={onUpdate}
      >
        <Table.Column 
          title='Текст'
          dataIndex='message'
          width='20%'
          render={(value, r: any) => <p style={{ maxWidth: '100%', maxHeight: 50, overflow: 'hidden' }}>{value}</p>}
        />
        <Table.Column 
          title='Товар'
          dataIndex='product'
          width='18%'
          render={(value) => <>
            {value && <p style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value.name}</p>}
          </>}
        />
        <Table.Column 
          title='Имя'
          dataIndex='name'
        />
        <Table.Column 
          title='Рейтинг'
          dataIndex='rating'
          width='10%'
        />
      </List>
    </Container>
  )
}