import React from 'react'
import NoInternship from './NoInternship';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
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