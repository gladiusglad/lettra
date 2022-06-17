import '../styles/globals.css'
import type { AppProps } from 'next/app'

const LettraApp = ({ Component, pageProps }: AppProps) => {
  return <>
    <Component {...pageProps} />
  </>
}

export default LettraApp
