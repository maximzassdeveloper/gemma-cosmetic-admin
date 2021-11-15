import React, { FC, useEffect, useState } from 'react'
import slugify from 'slugify'
import { Button, Card, Col, Form, Input, InputNumber, Row } from 'antd'
import { Container, FileUpload } from '../components'
import { AttributeWidget, CategoryWidget, MetaWidget, TagsWidget } from '../components/widgets'
import { validateMessages } from '../helper/validationMes'
import { IProduct } from '../types/product'
import { HtmlEditor } from './HtmlEditor'

interface IFields {
  name: string,
  slug?: string,
  price: number,
  desc?: any,
  images: [],
  categories?: [],
  attrs: number[],
  metaTitle?: string,
  metaDesc?: string,
  metaKeywords?: string,
  metaRobots?: string,
}

interface ProductProps {
  data?: IProduct,
  buttonText?: string,
  title?: string,
  onSubmit: (data: IFields) => void
}

export const Product: FC<ProductProps> = ({ data: serverData, title, buttonText, onSubmit }) => {

  const [defaultData, setDefaultData] = useState(serverData)
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    setDefaultData(serverData)
  }, [serverData, defaultData])

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = slugify(e.target.value, { lower: true })
    form.setFieldsValue({ slug })
  }

  return (
    <Container title={title || 'Создание товара'} headerContent={<>
      <Button onClick={() => form.submit()} type='primary'>{buttonText || 'Создать'}</Button>
    </>}>
      <Card>

        <Form 
          form={form} 
          layout='vertical' 
          onFinish={onSubmit}
          initialValues={{...defaultData}}
          validateMessages={validateMessages}
        >
          <Row className="create-product" justify='space-between' gutter={20}>

            <Col span={12}>
              <Form.Item 
                name='name' 
                rules={[{ required: true }]}
                className="create-product__name" 
              >
                <Input 
                  placeholder='Название товара'
                  onChange={nameHandler} 
                />
              </Form.Item>

              <Form.Item name='slug'>
                <Input size={'small'} placeholder='Слаг товара' />
              </Form.Item>

              <Form.Item name='price' label='Цена' rules={[{ required: true }]}>
                <InputNumber size='large' step={500} min={150} max={100000} />
              </Form.Item>

              <Form.Item name='images' label='Изображения' rules={[{ required: true }]}>
                <FileUpload files={defaultData?.images} />
              </Form.Item>

              <Form.Item name='desc'>
                {/* <Input.TextArea 
                  showCount 
                  rows={8} 
                  placeholder='Описание товара' 
                /> */}
                <HtmlEditor />
              </Form.Item>

            </Col>

            <Col span={12}>
              <Row wrap={true}>


                <Form.Item name='attrs'>
                  <AttributeWidget />
                </Form.Item>

                <Form.Item name='categories'>
                  <CategoryWidget /> 
                </Form.Item>

                <Form.Item name='tags'>
                  <TagsWidget />
                </Form.Item>

                <MetaWidget />

              </Row>
            </Col>

          </Row>    
        </Form>
        

      </Card>
    </Container>
  )
}