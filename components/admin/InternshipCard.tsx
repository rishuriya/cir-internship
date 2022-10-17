import { useEffect, useState } from 'react';
import {AiOutlineCheck, AiOutlineClose,AiOutlineDownload } from 'react-icons/ai';

export default function InternshipCard({internships}) {

    
    // const [student,setStudent]=useState(null);
    const {  user, company_name, company_person_name, internship_start_date, internship_end_date, internship_mode, company_location, company_email, training_type,company_mobile,company_website } = internships;
    // useEffect(()=>{
    //     const userObject={
    //         _id:user
    //       }
    //     fetch("/api/student/userData",{
    //         method:"GET",
    //         headers:{
    //         "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify(userObject),
    //     }).then(async (res)=>{
    //         const resData=await res.json();
    //         console.log(resData);
    //         setStudent(resData.data);
    //     });
    // },[])


    return (
        <div className='flex flex-col mx-auto my-8 max-w-md md:max-w-3xl rounded-xl shadow-xl border-gray-600 border-0  p-10'>
            <div className="flex flex-col sm:flex-row justify-around text-ellipsis">

                <div>
                    <p className='text-xl font-medium'>{user.name}</p>
                    <p className="my-2 ">{user.email}</p>
                    <p>AM.EN.U4CSE21169</p>
                    <p className='font-light'>{user.email}</p>
                    <p>BTech</p>
                    <p className=''>Computer Science(Artificial Intelligence)</p>
                    <p>3rd Year</p>
                </div>

                <div className='my-5 sm:my-0'>
                    <p className='font-medium text-lg'><span className='font-semibold text-lg'>Company:  </span >{company_name}</p>
                    <p className='font-normal'>{company_location}</p>

                    <p className='font-light'>({company_email})</p>
                    <p className='h-3'>{}</p>
                    <p className='ml-2 my-1'>{internship_start_date} - {internship_end_date}</p>
                    <p className='ml-2'>Offline</p>
                </div>

            </div>

            <div className='flex flex-col sm:flex-row '>
            <button className='flex flex-row text-sm font-light my-3 ml-5'>
                <AiOutlineDownload size={20} className="mx-2"/>Offer Letter
            </button>

            <div className='flex flex-row flex-nowrap ml-auto mr-5 mt-3 sm:mt-5'>
                <button className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3">
                    <AiOutlineCheck className='fill-green-700' size={28}/> <span>Approve</span>
                </button>
                <button className="flex bg-red-300 rounded-2xl py-1 px-2  flex-row mx-3">
                    <AiOutlineClose className='fill-red-700' size={28}/> <span>Decline</span>
                </button>
            </div>

            </div>
        </div>
    )
}
