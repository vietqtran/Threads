'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useId } from 'react'

interface Props {
  placeholder?: string
  autoFocus?: boolean
}

const Editor = ({ placeholder, autoFocus }: Props) => {
  const id = useId()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder
      })
    ],
    content: ''
  })

  return <EditorContent autoFocus={autoFocus} id={id} editor={editor} />
}

export default Editor
