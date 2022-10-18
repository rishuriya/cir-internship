import { useEffect, useState } from 'react';
import {AiOutlineCheck, AiOutlineDown,AiOutlineUp,AiOutlineClose,AiOutlineDownload ,AiOutlineLoading3Quarters} from 'react-icons/ai';


export default function InternshipCard({internship}) {


    const [student,setStudent]=useState(null);
    const [loading,setLoading]=useState(true);
    const [showDetails,setShowDetails]=useState(false);

    useEffect(()=>{
        const userObject={
            _id:internship.user
        }
        fetch("/api/student/userData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userObject),
        }).then(async (res)=>{
            const resData=await res.json();
            console.log(resData);
            setStudent(resData.data);
        });
    },[])

    useEffect(()=>{
        if(student){
            setLoading(false);
        }
    },[student])
   

    console.log(internship)
    const fromDateJs=new Date(internship.internship_start_date);
    const toDateJs=new Date(internship.internship_end_date);
    const fromDate=(fromDateJs.getDate() + "/" + (fromDateJs.getMonth() + 1) + "/" + fromDateJs.getFullYear());
    const toDate=(toDateJs.getDate() + "/" + (toDateJs.getMonth() + 1) + "/" + toDateJs.getFullYear());

    return (
        <>
        {(!loading)?(
            <>
            <tr className=' mx-auto my-8 max-w-md md:max-w-7xl rounded-xl shadow-xl border-gray-600 border-0  p-10 '>
                <td>
                    {showDetails?(
                        <AiOutlineUp onClick={()=>setShowDetails(false)} className='mx-2 fill-primary cursor-pointer'  size={25}/>):
                        (<AiOutlineDown onClick={()=>setShowDetails(true)} className='mx-2 fill-primary cursor-pointer'  size={25}/>)}
                    
                </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        {student.name}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{student.rollno}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{fromDate} - {toDate}</div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                        <p className=''>{internship.company_name}</p>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                        <p className=''>{internship.internship_mode+"/"+internship.training_type}</p>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                     <div className='flex flex-row flex-nowrap ml-auto mr-5 mt-3 sm:mt-5'>
                        <button className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3">
                            <AiOutlineCheck className='fill-green-700' size={26}/> <span>Approve</span>
                        </button>
                        <button className="flex bg-red-300 rounded-2xl py-1 px-2  flex-row mx-3">
                            <AiOutlineClose className='fill-red-700' size={26}/> <span>Decline</span>
                        </button>
                        </div>
                    </td>
            </tr>
            <tr className={showDetails?"h-28 border-b-4":"hidden"}>
                <td ></td>
                <td colSpan={4}> 
                    <div>
                    <p className='font-light'>{student.email}</p>
                    <p className='font-light'>{student.course}</p>
                    
                        <p className='my-4'><span className='font-medium pr-2'>Mentor Name:</span>{internship.company_person_name}</p>
                        <div className='flex flex-row'>
                            <AiOutlineDownload className='fill-primary' size={28}/>
                            <p className='mx-2'>Offer Letter</p>
                        </div>
                    </div>
                </td>
            </tr>
            </>
            ):(
                <>
                <AiOutlineLoading3Quarters className='fill-primary my-10 mx-auto animate-spin' size={32}/>
                </>
            )
            }
        </>
    )
}

// <div className="flex flex-col sm:flex-row justify-around text-ellipsis">

// <div>
//     <p className='text-xl font-medium'>{student.name}</p>
//     <p className="my-2 ">{student.email}</p>
//     <p>AM.EN.U4CSE21169</p>
//     <p className='font-light'>{student.email}</p>
//     <p>BTech</p>
//     <p className=''>Computer Science(Artificial Intelligence)</p>
//     <p>3rd Year</p>
// </div>

// <div className='my-5 sm:my-0'>
//     <p className='font-medium text-lg'><span className='font-semibold text-lg'>Company:  </span >{internship.company_name}</p>
//     <p className='font-normal'>{internship.company_location}</p>

//     <p className='font-light'>({internship.company_email})</p>
//     <p className='h-3'>{}</p>
//     <div className='ml-2 my-1'>
//         {fromDate} - {toDate}
//     </div>
//     <p className='ml-2'>Offline</p>
// </div>

// </div>

// <div className='flex flex-col sm:flex-row '>
// <button className='flex flex-row text-sm font-light my-3 ml-5'>
// <AiOutlineDownload size={20} className="mx-2"/>Offer Letter
// </button>

// <div className='flex flex-row flex-nowrap ml-auto mr-5 mt-3 sm:mt-5'>
// <button className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3">
//     <AiOutlineCheck className='fill-green-700' size={28}/> <span>Approve</span>
// </button>
// <button className="flex bg-red-300 rounded-2xl py-1 px-2  flex-row mx-3">
//     <AiOutlineClose className='fill-red-700' size={28}/> <span>Decline</span>
// </button>
// </div>

// </div>