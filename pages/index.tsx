import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import Router from "next/router";


const Home: NextPage = () => {

  const user = useSelector((state: RootState) => state.user.value)

  useEffect(() => {
    if(user===null){
      Router.push("/login");
    }
  },[]
  )

  return (
    <div className="">
      <Head>
        <title>Amrita Internship - CIR</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
      </main>


      <footer className="">

      </footer>
    </div>
  )
}

export default Home
