import React from 'react'
import { Form, Input, Typography } from 'antd'

export const MetaWidget: React.FC = () => {
  return (
    <div className="meta-widget widget">
      <Typography.Title level={5}>Мета данные</Typography.Title>
      <Form.Item name='metaTitle' label='Title'>
        <Input />
      </Form.Item>
      <Form.Item name='metaDesc' label='Description'>
        <Input />
      </Form.Item>
      <Form.Item name='metaKeywords' label='Keywords'>
        <Input />
      </Form.Item>
      <Form.Item name='metaRobots' label='Robots'>
        <Input />
      </Form.Item>
    </div>
  )
}