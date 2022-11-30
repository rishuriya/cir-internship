import React from 'react'
import Navbar from './Navbar'
import SideNav from './SideNav'
import TableDashboard from './TableDashboard'

function AdminHome() {
  return (
    <div className='flex flex-row'>
        <SideNav/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg text-center'>
                Administrative Portal
            </div>
            <div className='font-medium mx-5 my-5 text-xl'>
               Internships
            </div>
            <TableDashboard/>
        </div>
        
    </div>
  )
}

export default AdminHome