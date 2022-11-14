import React from 'react'
import {useRouter} from 'next/router'

// import TableOne from './TableOne'


function pdfviewer() {
    const router = useRouter()
    const location=router.query.id;
  return (
    <div>
        
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
            <div className='my-3 mx-2 font-semibold text-lg text-center'>
                Admin Portal
            </div>
            <div className='font-medium mx-5 my-5 text-xl'>
            Internships
            </div>
        </div>
    </div>
  )
}

export default pdfviewer