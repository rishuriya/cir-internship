import {AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export default function MemberCard({user}) {


    const { id, name, email, gender, company, mentor, internship_start_date, internship_end_date, internship_mode, approved, company_location, company_email, company_mobile } = user;

    return (
        <div className='flex flex-col mx-auto my-8 max-w-md md:max-w-3xl rounded-xl shadow-xl border-gray-600 border-0  p-10'>
            <div className="flex flex-row justify-around">
                <div>
                    <p className='text-xl font-medium'>{name}</p>
                    <p>AM.EN.U4CSE21169</p>
                    <p className='font-light'>{gender}</p>
                    <p>BTech</p>
                </div>
                <div className=''>
                    <p className='font-medium text-lg'><span className='font-semibold text-lg'>Company:  </span >{company}</p>
                    <p className='font-light'>({company_email})</p>
                    <p className='font-normal'>{company_location}</p>
                    <p className='h-3'>{}</p>
                    <p className='ml-2 my-1'>{internship_start_date} - {internship_end_date}</p>
                    <p className='ml-2'>Offline</p>
                </div>
                
            </div>
            <div className='flex flex-row '>
                    <button className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3">
                        <AiOutlineCheck className='fill-green-700' size={28}/> <span>Approve</span>
                    </button>
                    <button className="flex bg-red-300 rounded-2xl p-1 flex-row mx-3">
                    <AiOutlineClose className='fill-red-700' size={28}/> <span>Decline</span>
                    </button>
                </div>
        </div>
    )
}
