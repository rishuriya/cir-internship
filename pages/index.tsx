import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>CIR Internship approval</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
       Home page should be redirected to <Link href="/login" ><span className='hover:underline text-blue-500 cursor-pointer'>login</span></Link>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home
