import { FocusEvent, FocusEventHandler } from "react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { Letter, LetterElement, TextElement } from "../pages/e/[eid]"

interface EditorTextElementProps {
  e: TextElement
  s: {[key: string] : string}
  modifyLetter: (modifyElement: ((element: LetterElement) => boolean)) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
  tagName?: string
  singleLine?: boolean
}

const EditorTextElement = ({e, s, modifyLetter, onBlur, tagName='p', singleLine}: EditorTextElementProps) => {
  const setText = (event: ContentEditableEvent) => {
    modifyLetter((element) => {
      if (element.type === 'text') {
        element.text = event.target.value
        console.log(element.text)
        return true
      }
      return false
    })
  }
  
  return (
    <div
      style={{ 
        width: e.width,
        height: e.height,
        textAlign: e.textAlign,
        transform: `translate(${e.x}px, ${e.y}px) rotate(${e.rotation}deg) scale(${e.scale})` 
      }}
      className={`${s.element} ${s.editorElement}`}
    >
      <ContentEditable
        html={e.text} 
        onChange={setText} 
        tagName={tagName} 
        className={s.textElement + (singleLine ? ' ' + s.singleLine : '')} 
        onBlur={onBlur} />
    </div>
  )
}

export default EditorTextElement