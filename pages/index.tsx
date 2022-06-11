import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import s from '../styles/Home.module.css'
import background from '../img/desk.webp'
import pen from '../img/pen.webp'
import envelope from '../img/envelope.webp'
import tag from '../img/tag.webp'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()
  const [hoveredButton, setHoveredButton] = useState(0)
  const [codeValue, setCodeValue] = useState('')

  const onCodeSubmit = (e) => {
    e.preventDefault()
    router.push('/v/' + codeValue)
  }

  return (
    <div className={s.container}>
      <Head>
        <title>Lettra</title>
        <meta name="description" content="Create and send an e-letter for your friends and loved ones!" />
      </Head>

      <div className={s.background}>
        <Image src={background} layout="fill" objectFit="cover" />
      </div>
      <div className={s.homeWrapper}>
        <h1 className={s.title}>
          Lettra
        </h1>
        <p className={s.description}>
          Create and send an e-letter.
        </p>
        <div className={s.panelsWrapper}>
          <button className={s.writeButton} onMouseEnter={() => setHoveredButton(-1)} onMouseLeave={() => setHoveredButton(0)}>
            <div className={s.panelBg}>
              <Image src={envelope} />
            </div>
            <p>Write letter</p>
          </button>
          <motion.div animate={{ rotate: hoveredButton * -10, transition: { ease: 'easeOut' } }}>
            <Image src={pen} width={50} height={500} />
          </motion.div>
          <div className={s.codeTag} onMouseEnter={() => setHoveredButton(1)} onMouseLeave={() => setHoveredButton(0)}>
            <div className={s.panelBg}>
              <Image src={tag} />
            </div>
            <form onSubmit={onCodeSubmit}>
              <label>
                Enter code
              </label>
              <div className={s.codeInputs}>
                <input className={s.codeInput} maxLength={6} value={codeValue} onChange={(e) => setCodeValue(e.target.value)} />
                <input type={'submit'} className={s.codeSubmit} value="⮞" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer>
        <span>Images by Unsplash and Pixabay</span>
        <span>Made by GladGladius © 2022</span>
      </footer>
    </div>
  )
}

export default Home
