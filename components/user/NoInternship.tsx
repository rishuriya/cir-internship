import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

function NoInternship() {
  return (
    <div className='px-2 py-10 text-2xl text-center'>
      <br/>
        <span className='mx-auto'>
            NO INTERNSHIP ADDED
        </span>
        <br/>
        <br/>
        <div className='text-center text-xl'>
            <span className='mx-auto'>
                You can add internships from the Add Internship button at the top.
            </span>
        </div>
        {/* <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'/>
        </div> */}
    </div>
  )
}

export default NoInternship