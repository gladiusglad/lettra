import type { NextPage } from 'next'
import Image from 'next/image'
import background from '../../img/desk.jpg'
import Head from 'next/head'
import { useRouter } from 'next/router'
import s from '../../styles/Viewer.module.css'
import { useRef, useState } from 'react'
import Envelope from '../../components/envelope'
import LetterPages from '../../components/letter-pages'

export interface Letter {
  title: string,
  to: string,
  from: string,
  pages: { id: number, text: string }[]
}

const Viewer: NextPage = () => {
  const router = useRouter()
  const { lid } = router.query
  const [opened, setOpened] = useState(false)
  const constraintsRef = useRef(null)
  const letter: Letter = {
    title: 'My Only One',
    to: 'Kate',
    from: 'Alex',
    pages: [
      {id: 0, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {id: 1, text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'},
      {id: 2, text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.'}
    ]
  }
  const pages = [0, 1, 2]

  const title = 'My Only One'

  return (
    <div className={s.container} ref={constraintsRef}>
      <Head>
          <title>{title}</title>
          <meta name="description" content="Create and send an e-letter for your friends and loved ones!" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet"></link>
      </Head>
      <div className={s.background}>
        <Image src={background} layout="fill" objectFit="cover" />
      </div>
      <Envelope letter={letter} opened={opened} s={s} onOpen={() => setOpened(true)} />
      <LetterPages opened={opened} letter={letter} constraintsRef={constraintsRef} s={s} />
    </div>
  )
}

export default Viewer