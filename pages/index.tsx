import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Amrita Internship - CIR</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
       Home page should be redirected to <Link href="/login" ><span className='hover:underline text-blue-500 cursor-pointer'>login</span></Link>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home
