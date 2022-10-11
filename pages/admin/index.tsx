import React from 'react'
import Link from 'next/link'
import Head from 'next/head'


function index() {
  return (
    <div>
       <Head>
        <title>CIR Admin - Amrita Internship</title>
        <meta name="description" content="Amrita Students can submit their Internship detail and get approval from CIR online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Has to be redirected to 
      <Link href="admin/login" >
        <span className='hover:underline text-blue-500 cursor-pointer'>admin login</span>
      </Link>
      , should have restricted access only after admin login!
    </div>
  )
}

export default index
