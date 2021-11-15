import React from 'react'
import { Link, useLocation  } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  AppstoreOutlined,
  BookOutlined,
  WindowsOutlined,
  SnippetsOutlined
} from '@ant-design/icons'

const menu = [{
  name: 'Консоль',
  link: '/',
  icon: <HomeOutlined />
}, {
  name: 'Товары',
  key: 'products',
  icon: <AppstoreOutlined />,
  sub: [
    { name: 'Все товары', link: '/products' }, 
    { name: 'Создать товар', link: '/products/create' }
  ]
}, {
  name: 'Категории',
  link: '/categories',
  icon: <BookOutlined />
}, {
  name: 'Атрибуты',
  link: '/attributes',
  icon: <SnippetsOutlined />
}]

export const Sidebar: React.FC = React.memo(() => {

  const location = useLocation()
  const [collapse, setCollapse] = React.useState(false)

  const openKeys = () => {
    let arr = undefined
    menu.forEach(i => {
      const founded = i.sub?.find(x => x.link === location.pathname)
      if (founded) arr = [i.key]
    })
    return arr
  }

  return (
    <Layout.Sider className="sidebar" collapsible collapsed={collapse} onCollapse={setCollapse}>
      <Menu 
        theme="dark" 
        mode="inline"
        defaultSelectedKeys={[location.pathname]} 
        defaultOpenKeys={openKeys()}
      >

        <Menu.Item key="0" className="logo" icon={<WindowsOutlined />}>
          Gemma Russia
        </Menu.Item>

        {menu.map(item => 
          item.sub?.length 
            ? <Menu.SubMenu key={item.key} icon={item.icon} title={item.name}>
              {item.sub.map(subitem =>
                <Menu.Item key={subitem.link}>
                  <Link to={subitem.link}>{subitem.name}</Link>
                </Menu.Item>
              )}
            </Menu.SubMenu>
            : <Menu.Item key={item.link} icon={item.icon}>
              <Link to={item.link || ''}>{item.name}</Link>
            </Menu.Item>
        )}

      </Menu>
    </Layout.Sider>
  )
})