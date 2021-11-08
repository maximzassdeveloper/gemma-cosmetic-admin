import { FC } from 'react'
import { Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoaderProps {
  
}

export const Loader: FC<LoaderProps> = () => {
  return (
    <Row justify='center' align='middle' style={{width: '100%'}}>
      <Spin indicator={<LoadingOutlined style={{fontSize: 70}} />} />
    </Row>
  )
}