import dynamic from 'next/dynamic'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import { Letter } from '../pages/v/[lid]'

interface EnvelopeProps {
  letter: Letter,
  s: {[key: string] : string},
  opened: boolean,
  onOpen: () => void
}

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export default function Envelope({ letter, s, opened, onOpen }: EnvelopeProps) {
  const [playing, setPlaying] = useState(false)
  const [behind, setBehind] = useState(false)
  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setBehind(true)
      }, 500)
    }
  }, [opened])
  
  return (
    <motion.div 
      initial={{y: '-120vh', rotate: -20}}
      animate={{y: 0, rotate: 0}}
      transition={{ease: 'easeOut', duration: 1}}
      className={s.envelopeWrapper}
      style={{zIndex: (behind ? 500 : 30000)}}>
      <ReactPlayer url='/img/envelope.webm' width={660} height={550} className={s.envelope} playing={playing} onEnded={onOpen} />
      <button onClick={() => setPlaying(true)}
        className={s.envelopeButton}
        style={{
          cursor: (playing ? 'initial' : 'pointer')
        }}
      >
        <h1 className={s.envelopeTo}>to: {letter.to}</h1>
      </button>
    </motion.div>
  )
}