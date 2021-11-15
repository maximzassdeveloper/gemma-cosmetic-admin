import { FC, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface HtmlEditorProps {
  value?: string,
  onChange?: (desc: any) => void
}

export const HtmlEditor: FC<HtmlEditorProps> = ({ value, onChange }) => {

  const editorRef = useRef<any>(null)

  const changeHandler = () => {
    if (!editorRef.current) return
    const content = editorRef.current.getContent()
    if (onChange) onChange(content)
  }

  return (
    <Editor
      onInit={(evt, editor) => editorRef.current = editor}
      onChange={changeHandler}
      initialValue={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  )
}