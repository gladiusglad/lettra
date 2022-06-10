import letterBg from '../img/paper.webp'
import Image from 'next/image'
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { MutableRefObject, useEffect, useState } from 'react'
import { Letter } from '../pages/v/[lid]'

interface LetterProps {
  opened: boolean,
  page: number,
  letter: Letter,
  active: boolean,
  zIndex: number,
  activate: () => void,
  discard: () => void,
  onAnimationEnd: () => void,
  constraintsRef: MutableRefObject<null>,
  s: {[key: string] : string}
}

const floatFilter = 'drop-shadow(100px -100px 10px rgba(0,0,0,0.2))'
const putFilter = 'drop-shadow(5px -5px 3px rgba(0,0,0,0.3))'

export default function LetterPage({ opened, page, letter, active, zIndex, activate, discard, onAnimationEnd, constraintsRef, s }: LetterProps) {
  const [focusPage, setFocusPage] = useState(true)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const startAnimation = {
    x: 0,
    y: 0,
    scale: 1,
    filter: floatFilter,
    transition: { ease: 'easeOut', duration: 0.5 }
  }
  const focusPut = {
    x: 0,
    y: 0,
    scale: 0.6,
    filter: putFilter,
    transition: { ease: 'easeOut' }
  }

  const dragStart = () => {
    activate()
  }

  const dragEnd = () => {
    if (x.get() <= -200 || x.get() >= 200) {
      controls.stop()
      controls.start({
        scale: 0.6,
        x: Math.sign(x.get()) * Math.max(650, Math.abs(x.get()) + 200),
        filter: putFilter,
        transition: { ease: 'easeOut', duration: 0.5 }
      })
      setFocusPage(false)
      discard()
    } else {
      controls.stop()
      controls.start(startAnimation)
      setFocusPage(true)
    }
  }

  useEffect(() => {
    if (active && focusPage) {
      controls.start(startAnimation)
    }
    if (!active && focusPage) {
      controls.stop()
      controls.start(focusPut)
    }
  }, [active])

  useEffect(() => {
    if (opened) {
      controls.start({
        y: [50, -600, 0],
        display: 'initial',
        transition: { duration: 1, delay: page * 0.02 }
      })
      .then(() => onAnimationEnd())
    }
  }, [opened])

  return (
    <motion.div 
      animate={controls}
      initial={{
        display: 'none',
        y: 50,
      }}
      drag
      whileDrag={{
        scale: 1.1,
        cursor: 'grabbing',
        filter: floatFilter,
        transition: { ease: 'easeOut' } }}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      dragConstraints={constraintsRef}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30, power: 0.1, timeConstant: 100 }}
      style={{ x, zIndex, rotate: useTransform(x, [-1000, -200, 0, 200, 1000], [-80, -5, 0, 5, 80]) }}
      className={s.letter}
    >
      <div className={s.letterBackground}>
        <Image src={letterBg} layout="fill" objectFit='contain' objectPosition='center' />
      </div>
      <div className={s.letterContent}>
        {page == 0 && <h1>{letter.title}</h1>}
        <p>{letter.pages[page].text}</p>
        {page == letter.pages.length - 1 && <p className={s.letterClosing}>Yours truly, {letter.from}</p>}
      </div>
    </motion.div>
  )
}