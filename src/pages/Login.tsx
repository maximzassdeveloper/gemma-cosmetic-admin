import { FC, useContext } from 'react'
import { Button, Card, Form, Input, Row, Typography } from 'antd'
import { authContext } from '../services/context/context'

export const Login: FC= () => {

  const { login, error } = useContext(authContext)

  const submitHandler = async (data: any) => {
    login(data)
  }

  return (
    <Row className="login">
      <Card className="login-card" bordered>
        <Typography.Title level={2}>Вход</Typography.Title>
        <Form onFinish={submitHandler} style={{width: 350}}>
          <Form.Item name='email' rules={[{ required: true }]}>
            <Input 
              size='large'
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true }]}>
            <Input 
              size={'large'}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' size='large' type='primary'>Войти</Button>
          </Form.Item>
          {error && <Typography.Text type='danger' style={{fontSize: 16}}>{error}</Typography.Text>}
        </Form>
      </Card>
    </Row>
  )
}