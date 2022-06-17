import letterBg from '../img/paper.webp'
import Image from 'next/image'
import { Letter, LetterElement, Page } from '../pages/e/[eid]'
import { FocusEventHandler, FormEvent } from 'react'
import EditorTextElement from './edit-text-element'

interface EditorPageProps {
  pageNumber: number
  page: Page
  s: {[key: string] : string}
  letter: Letter
  setLetter: (letter: Letter) => void
}

const EditorPage = ({ pageNumber, page, s, letter, setLetter }: EditorPageProps) => {
  const modifyLetterElement = (elementId: number, modifyElement: (element: LetterElement) => boolean) => {
    const l = {...letter}
    const element = l.pages[pageNumber].elements[elementId]
    if (modifyElement(element)) {
      setLetter(l)
    }
  }

  const modifyLetterTitle: FocusEventHandler<HTMLDivElement> = (e) => {
    const l = {...letter}
    l.title = e.currentTarget.textContent || 'Untitled letter'
    setLetter(l)
  }

  return (
    <div className={s.letter}>
      <div className={s.letterBackground}>
        <Image src={letterBg} layout="fill" objectFit='contain' objectPosition='center' />
      </div>
      <div className={s.letterContainer}>
        <div className={s.letterContent}>
        {page.elements.map((e, i) => {
          switch (e.type) {
            case 'text':
              if (pageNumber === 0 && i === 0) {
                return <EditorTextElement key={i} 
                  e={e} 
                  s={s} 
                  modifyLetter={(e) => modifyLetterElement(i, e)} 
                  onBlur={modifyLetterTitle} 
                  tagName="h1"
                  singleLine />
              } else {
                return <EditorTextElement key={i} 
                e={e} 
                s={s} 
                modifyLetter={(e) => modifyLetterElement(i, e)} />
              }
            default:
              return <div></div>
          }
        })}
        </div>
      </div>
    </div>
  )
}

export default EditorPage