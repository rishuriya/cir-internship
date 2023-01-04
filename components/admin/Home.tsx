import React from 'react'
import SideNav from './SideNav'
// import Sidebar from './Sidebar'
import TableDashboard from './TableDashboard'
import Navbar from './Navbar'

function AdminHome() {

  return (
    // <div className='flex mx-[1px] lg:pl-[18vw]'>
    <>
    <Navbar/>
    <div className='flex'>
        <SideNav/>
        {/* <Sidebar/> */}
        <div className='max-w-7xl px-4 sm:px-6 lg:w-[95vw] lg:mx-[8vw]'>
            <div className='my-3 mx-2 font-semibold text-2xl text-center'>
                Administrative Portal
            </div>
            <div className='font-medium mx-5 my-5 text-xl'>
               Internships
            </div>
            <TableDashboard/>
        </div>
    </div>
    </>
  )
}

export default AdminHome