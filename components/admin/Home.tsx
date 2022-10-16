import React from 'react'
import Navbar from './Navbar'
import TableOne from './TableOne'

function AdminHome() {
  return (
    <div>
        <Navbar/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg'>
                Admin Portal
            </div>
            <TableOne/>
        </div>
    </div>
  )
}

export default AdminHome