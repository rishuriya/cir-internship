import React from 'react'
import NoInternship from './NoInternship';
import Navbar from './Navbar';
import InternshipCard from './InternshipCard';

function Home() {
  return (
    <div>
    <Navbar />

    <main className="mx-auto max-w-7xl px-4 sm:px-6">
     <NoInternship/>

      <InternshipCard date={"Oct 27th, 2022"} status={"Pending"} company={"Google"} duration={"29th Feb to 31st Feb 2023"} mode={"offline"} place={"Bangalore, India"} remarks={"Awaiting approval"} />

      <InternshipCard date={"Nov 3rd, 2022"} status={"Approved"} company={"Repl.ai"} duration={"29th Dec to 31st Dec 2023"} mode={"offline"} place={"Mumbai, India"} remarks={"Approved and verified"} />

      <InternshipCard date={"Dec 7th, 2022"} status={"Disapproved"} company={"Alpha Software"} duration={"29th Jan to 31st Jan 2023"} mode={"offline"} place={"Hydrebad, India"} remarks={"Disapproved, proof not provided"} />
    </main>

    <footer className="">
    </footer>
    </div>
  )
}

export default Home