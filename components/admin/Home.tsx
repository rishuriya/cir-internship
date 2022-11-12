import React from 'react'
import Navbar from './Navbar'
// import TableOne from './TableOne'
// import InternshipList from './InternshipList'
import FilteringTable from './FilteringTable'

function AdminHome() {
  return (
    <div>
        <Navbar/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg text-center'>
                Admin Portal
            </div>
            <div className='font-medium mx-5 my-5 text-xl'>
            Internships
            </div>
            <FilteringTable/>
            {/* <InternshipList/> */}
        </div>
    </div>
  )
}

export default AdminHome