import React from 'react'
import Link from 'next/link'

function index() {
  return (
    <div>
      Has to be redirected to 
      <Link href="admin/login" >
        <span className='hover:underline text-blue-500 cursor-pointer'>admin login</span>
      </Link>
      , should have restricted access only after admin login!
    </div>
  )
}

export default index
