import React from 'react'
import Navbar from './Navbar'
// import TableOne from './TableOne'
import MemberCard from './MemberCard'
import CardMap from './CardMap'

function AdminHome() {
  return (
    <div>
        <Navbar/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg text-center'>
                Admin Portal
            </div>
            {/* <TableOne/> */}
            <CardMap/>
        </div>
    </div>
  )
}

export default AdminHome