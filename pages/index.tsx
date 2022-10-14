import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useEffect } from 'react'
import Router from "next/router";
import NoInternship from '../components/NoInternship'
import cookie from 'js-cookie';

const Home: NextPage = () => {

  const user = cookie.get("token");

  useEffect(() => {
    console.log(user)
      if(user===null){
        Router.push("/login");
      }
   },[user]
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
        <NoInternship/>
      </main>


      <footer className="">

      </footer>
    </div>
  )
}

export default Home
