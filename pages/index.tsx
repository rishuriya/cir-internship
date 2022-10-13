import Link from 'next/link'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../slices/counterSlice'
import { RootState } from '../store'

const Home: NextPage = () => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

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

      <br />

      <h3 className='ml-20'>Redux role testing buttons</h3>

      <br />

      <button
        className='ml-20 p-2 bg-green-600'
        onClick={() => dispatch(increment())}>
        Admin
      </button>

      <button
        className='ml-20 p-2 bg-red-600'
        onClick={() => dispatch(decrement())}>
        Student
      </button>

      <footer className="">

      </footer>
    </div>
  )
}

export default Home
