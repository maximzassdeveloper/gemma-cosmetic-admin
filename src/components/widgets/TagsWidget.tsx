import React, { FC, useEffect, useState } from 'react'
import { Input, Tag, Typography } from 'antd'

interface TagsWidgetProps {
  value?: string[],
  onChange?: (tags: string[]) => void
}

export const TagsWidget: FC<TagsWidgetProps> = ({ value, onChange }) => {

  const [tags, setTags] = useState<string[]>(value || [])
  const [text, setText] = useState('')

  useEffect(() => {
    if (value) setText(value.join(', '))
  }, [])

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    const newTags = e.target.value.split(',').map(t => t.trim())
    setTags(newTags)
    if (onChange) onChange(newTags)
  }

  return (
    <div className="tags-widget widget">
      <Typography.Title level={5}>Категории</Typography.Title>
      <Input.TextArea 
        onChange={changeHandler}
        value={text}
        placeholder='Вводите теги через запятую' rows={3} 
      />
      {tags.map((tag, i) => <Tag key={tag+i} style={{marginTop: 5, fontSize: 14}}>{tag}</Tag>)}
    </div>
  )
}