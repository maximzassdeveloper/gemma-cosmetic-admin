import React from 'react'
import slugify from 'slugify'
import { Input, Select, Col, Row, Typography, Button } from 'antd'
import { ICategory } from '../../types/product'
import { fetchData } from '../../services/fetchData'

interface CategoryWidgetProps {
  value?: ICategory[],
  onChange?: (value: any) => void
}

export const CategoryWidget: React.FC<CategoryWidgetProps> = React.memo(({ value, onChange }) => {

  const [name, setName] = React.useState('')
  const [cats, setCats] = React.useState<ICategory[]>([])
  const [selected, setSelected] = React.useState<string[]>([])

  React.useEffect(() => {
    if (onChange) onChange(selected)
  }, [selected])

  const selectHandler = (value: string[]) => {
    setSelected(value)
  }

  const addHandler = () => {
    if (!name.trim()) return

    const newCat = { id: Date.now(), name, slug: slugify(name, { lower: true }) }
    setCats([newCat, ...cats])
    setSelected([...selected, name])
    setName('')
  }

  React.useEffect(() => {
    const getCats = async () => {
      const data = await fetchData({ url: '/categories' })
      setCats(data)
    }
    getCats()

    if (!value) return
    setSelected(value.map(c => c.name)) 
  }, [])

  return (
    <div className="category-widget widget">
      <Typography.Title level={5}>Категории</Typography.Title>
      <Select
        mode='tags'
        style={{width: '100%'}}
        onChange={selectHandler}
        value={selected}
        placeholder='Выберите категории'
      >
        {cats.map(cat =>
          <Select.Option value={cat.name} key={cat.id}>{cat.name}</Select.Option>
        )}
      </Select>
      
      <div className="category-widget__form">
        <Typography.Title level={5} >Создать категорию</Typography.Title>
        <Row gutter={10}>

          <Col span={16}>
            <Input 
              value={name}
              placeholder='Название' 
              onChange={e => setName(e.target.value)}
            />
          </Col>

          <Col span={8}>
            <Button 
              htmlType='button' 
              style={{ width: '100%' }} 
              type='primary'
              onClick={addHandler}
            >
              Создать
            </Button>
          </Col>

        </Row>
      </div>
    </div>
  )
})