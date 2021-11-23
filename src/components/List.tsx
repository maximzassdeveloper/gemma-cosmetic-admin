import { FC } from 'react'
import { Table, Button } from 'antd'

interface ListProps {
  data: any[],
  loading?: boolean,
  onDelete?: (id: number) => void,
  onUpdate?: (id: number) => void
}

export const List: FC<ListProps> = ({ children, data, loading, onDelete, onUpdate }) => {
  return (
    <Table
      dataSource={data}
      loading={loading}
      tableLayout='auto'
      sticky
      rowKey='id'
    >
      <Table.Column 
        title='Id'
        dataIndex='id'
        width='5%'
      />
      {children}
      <Table.Column 
        title='Дата' 
        dataIndex='date' 
        width='18%' 
        render={(_, r: any) => <p>
            Обновлено {new Date(r.updatedAt).toLocaleDateString()}<br />
            Опубликовано {new Date(r.createdAt).toLocaleDateString()}
          </p>} 
      />
      {(onUpdate || onDelete) && <Table.Column 
        title='Действия' 
        dataIndex='delete' 
        width='10%' 
        render={(_, r: any) => <>
            {onDelete && <Button style={{ marginBottom: 5 }} onClick={() => onDelete(r.id)}>Удалить</Button>}
            {onUpdate && <Button onClick={() => onUpdate(r.id)}>Изменить</Button>}
          </>} 
      />}
    </Table>
  )
}