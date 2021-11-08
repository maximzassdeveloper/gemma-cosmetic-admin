import React, { useContext } from 'react'
import { Button, Layout, Row } from 'antd'
import { authContext } from '../services/context/context'

interface ContainerProps {
  title?: string,
  headerContent?: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children, title, headerContent }) => {

  const { user, logout } = useContext(authContext)

  return (
    <Layout className="layout">

      <Layout.Header className="header">
        <Row justify='space-between' align='middle'>
          {title && <h2 className="header__title">{title}</h2>}
          {headerContent && <div className="header__content">
            {headerContent}
          </div>}
          <div className="header__user">
            {user?.fullName} 
            <Button onClick={logout}>Выход</Button>
          </div>
        </Row>
      </Layout.Header>

      <Layout.Content>
        <div className="layout-content">
          {children}
        </div>
      </Layout.Content>

    </Layout>
  )
}