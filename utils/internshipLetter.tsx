import React from 'react'

function internshipLetter(props) {
//   const {name}=props.user;
  return (
    <div className='mx-auto max-w-5xl px-4 sm:px-8 my-10'>
        <div>
            <p>To,</p>
            <p>The Principle,</p>
        </div>
        <div className='my-5'>
            <p>Amrita Vishwa Vidyapeetham</p>
            <p>Amritapuri, Kollam, Kerala</p>
        </div>
        <div className='my-5'>
            <p>Subject: Regarding approval to join internship.</p>
        </div>
        <div className='my-5'>
            <p>Respected Sir/Madam,</p>
        </div>
        <div className='my-5'>
            <p className='indent-8'>I am Student_name from course branch student of year_of_joining batch currently studying in semester.
             I applied for the Internship program in the Company_Name for internship_type and I got selected for program.</p>
             <p className='my-3'>I request you to give me permission to join the internship which is starting on start_date and ending on End_date.</p>
        </div>
        <div className='flex flex-row justify-between mx-3 items-end'>
            <div>
                <p>Thanking You,</p>
                <p>Yours truly,</p>
                <p>name</p>
                <p>Signature</p>
            </div>
            <div>
               
                <p className='mb-2'>Advisor signature</p>
            </div>
            <div>
                <p className='mb-2'>HOD signature</p>
            </div>

        </div>
      
    </div>
  )
}
export default internshipLetter