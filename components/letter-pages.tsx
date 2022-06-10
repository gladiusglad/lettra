import LetterPage from './letter-page'
import { MutableRefObject, useState } from 'react'
import { motion } from "framer-motion"
import { Letter } from '../pages/v/[lid]'

const focusIndex = 20000, discardIndex = 10000

interface LetterPagesProps {
  opened: boolean,
  letter: Letter,
  constraintsRef: MutableRefObject<null>,
  s: {[key: string] : string}
}

export default function LetterPages({ opened, letter, constraintsRef, s }: LetterPagesProps) {
  const [animationEnded, setAnimationEnded] = useState(false)
  const [zIndexes, setZIndexes] = useState(letter.pages.map(p => focusIndex + letter.pages.length - p.id))

  const getActivePage = () => {
    return animationEnded ? zIndexes.indexOf(Math.max(...zIndexes)) : -1
  }

  const onActivate = (page) => {
    let indexes = [...zIndexes]
    const max = Math.max(...indexes)
    indexes[page] = max < focusIndex ? focusIndex : max + 1
    setZIndexes(indexes)
  }

  const onDiscard = (page) => {
    let indexes = [...zIndexes]
    let discardIndexes = indexes.filter(i => i < focusIndex)
    indexes[page] = discardIndexes.length > 0 ? Math.max(...discardIndexes) + 1 : discardIndex
    setZIndexes(indexes)
  }

  return (
    <motion.div className={s.letterWrapper}>
      {letter.pages.map(page =>
        <LetterPage
          key={page.id}
          opened={opened}
          page={page.id}
          letter={letter}
          active={getActivePage() == page.id}
          zIndex={zIndexes[page.id]}
          activate={() => onActivate(page.id)}
          discard={() => onDiscard(page.id)}
          onAnimationEnd={() => setAnimationEnded(true)}
          constraintsRef={constraintsRef}
          s={s}
      />)}
    </motion.div>
  )
}