import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
        <title>Amrita Internship - CIR</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
