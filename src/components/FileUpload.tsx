import React from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { SERVER_URL } from '../helper/config'
import authAxios from '../services/authAxios'
import { IFile } from '../types/product'

interface FileUploadProps {
  max?: number,
  files?: IFile[],
  onChange?: (values: any) => void
}

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const FileUpload: React.FC<FileUploadProps> = React.memo(({ 
  max = 5, files: serverFiles, onChange 
}) => {

  const [files, setFiles] = React.useState<UploadFile[]>([])
  const [preview, setPreview] = React.useState(false)
  const [previewTitle, setPreviewTitle] = React.useState('')
  const [previewImage, setPreviewImage] = React.useState('')

  React.useEffect(() => {
    if (!serverFiles) return
    setFiles(serverFiles.map(f => ({
      uid: f.id.toString(),
      name: f.url,
      url: SERVER_URL + '/' + f.url
    })))
  }, [serverFiles])

  React.useEffect(() => {
    if (onChange) onChange(files.map(f => f.response?.file.url || f.name))
  }, [files])

  const changeHandler = (data: UploadChangeParam) => {
    setFiles(data.fileList)
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreview(true)
    setPreviewImage(file.url || file.preview)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const removeHandler = async (file: UploadFile) => {
    const f = file.response?.file?.url || file.name
    if (!f) return false
    try {
      await authAxios.post('/upload/remove', { url: f })
    } catch(e) {
      console.log(e)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload 
        listType='picture-card'
        fileList={files}
        maxCount={max}
        onChange={changeHandler}
        onPreview={handlePreview}
        action={`${SERVER_URL}/api/upload/add`}
        onRemove={removeHandler}
        multiple
      >
        {uploadButton}
      </Upload> 
      <Modal
        visible={preview}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreview(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
})