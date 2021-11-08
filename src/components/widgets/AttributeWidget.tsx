import { FC, useEffect, useState } from 'react'
import { Typography, Form, Row, Col, Input, Button, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { IAttribute, IAttributeValue, IProductAttribute } from '../../types/product'
import { fetchData } from '../../services/fetchData'

interface AttrItem {
  id: number,
  name: string,
  values: string[],
  idValues: number[],
  allValues?: IAttributeValue[]
}

interface AttributeWidgetProps {
  value?: IProductAttribute[],
  onChange?: (values: number[]) => void
}

export const AttributeWidget: FC<AttributeWidgetProps> = ({ value, onChange }) => {

  const [attributes, setAttributes] = useState<IAttribute[]>([])
  const [items, setItems] = useState<AttrItem[]>([])

  useEffect(() => {
    let newItems: number[] = []
    items.forEach(item => {
      if (!item.name || !item.values.length || !item.idValues.length) return
      newItems = [...newItems, ...item.idValues]
    })
    
    if (onChange) onChange(newItems)
  }, [items])

  const selectAttr = (name: string, id: number) => {  
    const cur = attributes.find(x => x.name === name)
    setItems(items.map(i => i.id === id ? {...i, name, allValues: cur?.attribute_values} : i))
  }

  const selectValue = (values: string[], id: number, allValues: IAttributeValue[] = []) => {
    const idValues: number[] = values.map(x => allValues.find(v => v.name === x)?.id || 0)
    setItems(items.map(i => (
      i.id === id ? {...i, values, idValues } : i)
    ))
  }

  const addHandler = () => {
    setItems([...items, { name: '', values: [], idValues: [], id: Date.now() }])
  }

  const removeHandler = (id: number) => {
    setItems(items.filter(x => x.id !== id))
  }

  useEffect(() => {
    (async () => {
      const data = await fetchData({ url: '/attributes' })
      setAttributes(data)
    })()

    if (!value) return
    const newItems: AttrItem[] = []
    value.forEach(val => {
      const curIndex = newItems.findIndex(x => x.name === val.attribute.name)
      if (curIndex >= 0) {
        newItems[curIndex] = { 
          ...newItems[curIndex], 
          values: [...newItems[curIndex].values, val.name],
          idValues: [...newItems[curIndex].idValues, val.id]
        }
      } else {
        newItems.push({
          id: val.attribute.id,
          name: val.attribute.name,
          values: [val.name],
          idValues: [val.id],
          allValues: attributes.find(x => x.id === val.attribute.id)?.attribute_values || []
        })
      }
    })
    setItems(newItems)
  }, [])

  return (
    <div className="attribute-widget widget">
      <Typography.Title level={5}>Атрибуты</Typography.Title>
        {items.map(item => 
          <Row key={item.id} gutter={10} style={{marginBottom: 10}}>
            <Col span={7}>
              <Select
                value={item.name || undefined}
                onChange={name => selectAttr(name, item.id)}
                placeholder='Выберите атрибут'
              >
                {attributes.map(attr =>
                  <Select.Option 
                    value={attr.name} 
                    key={attr.id}
                    disabled={!!items.find(i => i.name === attr.name)}
                  >
                    {attr.name}
                  </Select.Option>
                )}
              </Select> 
            </Col>
            <Col span={16}>
              <Select
                mode={'tags'}
                value={item.values}
                onChange={v => selectValue(v, item.id, item.allValues)}
                placeholder='Выберите значение'
              >
                {item.allValues?.map(item => 
                  <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
                )}
              </Select>
            </Col>
            <Col span={1}>
              <MinusCircleOutlined onClick={() => removeHandler(item.id)} />
            </Col>
          </Row>
        )}
        <Button onClick={addHandler} type='primary'>Добавить</Button>
    </div>
  )
}