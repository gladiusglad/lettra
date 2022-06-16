import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import s from '../../styles/Viewer.module.css'
import Image from 'next/image'
import background from '../../img/desk.webp'
import letterBg from '../../img/paper.webp'
import EditorPage from "../../components/editor-page"
import CSS from 'csstype'

export interface Letter {
  uuid: string,
  code?: string,
  theme: string,
  title: string,
  to: string,
  date: Date,
  pages: Page[]
}

interface ElementCore {
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number
}

type SVGElement = ElementCore & {
  type: 'svg'
  svg: string
}

export type TextElement = ElementCore & {
  type: 'text'
  text: string
  scale: number
  textAlign: CSS.Property.TextAlign
}

export type LetterElement = SVGElement | TextElement

export interface Page {
  elements: LetterElement[]
}

const testLetter: Letter = {
  uuid: 'testuuid',
  code: '123123',
  theme: 'default',
  title: 'for Kate',
  to: 'Kate',
  date: new Date(),
  pages: [{
    elements: [
      {type: 'text', x: 240, y: 50, width: 400, height: 45, rotation: 0, text: 'for Kate', scale:2, textAlign: 'center'},
      {type: 'text', x: 100, y: 100, width: 500, height: 300, rotation: 0, text: 'Hello world!', scale: 1, textAlign: 'left'}
    ]
  }]
}

const Editor: NextPage = () => {
  const router = useRouter()
  const { eid } = router.query
  const [letter, setLetter] = useState(testLetter)

  return (
    <div className={s.container}>
      <Head>
        <title>{letter.title}</title>
        <meta name="description" content="Create and send an e-letter for your friends and loved ones!" />
      </Head>
      <div className={s.background}>
        <Image src={background} layout="fill" objectFit="cover" />
      </div>
      <div className={s.paperStack}>
        <Image src={letterBg} layout="fill" objectFit="cover" />
      </div>
      {letter.pages.map((e, i) => {
        return <EditorPage key={i} pageNumber={i} page={e} s={s} letter={letter} setLetter={setLetter} />
      })}
    </div>
  )
}

export default Editor