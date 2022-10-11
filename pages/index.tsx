import Link from 'next/link'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="">

      <main className="">
       Home page should be redirected to <Link href="/login" ><span className='hover:underline text-blue-500 cursor-pointer'>login</span></Link>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export default Home
