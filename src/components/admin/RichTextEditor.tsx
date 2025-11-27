'use client'

import React, { useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      onChange(newContent)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  // Sincronizar contenido cuando cambie desde afuera
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  return (
    <div className="border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50 rounded-t-md">
        <div className="flex flex-wrap gap-1">
          {/* Format buttons */}
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Negrita"
          >
            <strong>B</strong>
          </button>

          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Cursiva"
          >
            <em>I</em>
          </button>

          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Subrayado"
          >
            <u>U</u>
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Heading buttons */}
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Título 1"
          >
            H1
          </button>

          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Título 2"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Título 3"
          >
            H3
          </button>

          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'p')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Párrafo"
          >
            P
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Alignment buttons */}
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Alinear a la izquierda"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Centrar"
          >
            ↔
          </button>

          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Alinear a la derecha"
          >
            →
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* List buttons */}
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Lista con viñetas"
          >
            •
          </button>

          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Lista numerada"
          >
            1.
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Clear formatting */}
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="px-2 py-1 text-sm rounded hover:bg-gray-200"
            title="Limpiar formato"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Editor content */}
      <div className="min-h-[200px]">
        <div
          ref={editorRef}
          contentEditable
          className="prose prose-lg max-w-none focus:outline-none min-h-[200px] px-3 py-2 text-gray-700"
          onInput={handleInput}
          style={{ whiteSpace: 'pre-wrap' }}
          suppressContentEditableWarning
          data-placeholder={placeholder}
        />
      </div>
    </div>
  )
}