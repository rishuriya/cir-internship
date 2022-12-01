import React from 'react'
import SideNav from './SideNav'
import TableDashboard from './TableDashboard'

function AdminHome() {

  return (
    <div className='mx-[1px]'>
        <SideNav/>
        <div className='max-w-7xl px-4 sm:px-6 lg:ml-[19rem]'>
            <div className='my-3 mx-2 font-semibold text-2xl text-center'>
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