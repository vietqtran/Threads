'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { memo, useId } from 'react'

import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  placeholder?: string
  autoFocus?: boolean
  content: string
  setContent: (content: string) => void
}

const Editor = ({ placeholder, autoFocus, content, setContent }: Props) => {
  const id = useId()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      })
    ],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    content
  })

  return <EditorContent autoFocus={autoFocus} id={id} editor={editor} />
}

export default memo(Editor)
