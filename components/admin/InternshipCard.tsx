import { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineDown, AiOutlineUp, AiOutlineClose, AiOutlineDownload, AiOutlineLoading3Quarters } from 'react-icons/ai';


export default function InternshipCard({ internship }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const userObject = {
            _id: internship.user
        }
        fetch("/api/student/userData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject),
        }).then(async (res) => {
            const resData = await res.json();
            console.log(resData);
            setStudent(resData.data);
        });
    }, [])

    useEffect(() => {
        if (student) {
            setLoading(false);
        }
    }, [student])


    console.log(internship)
    const fromDateJs = new Date(internship.internship_start_date);
    const toDateJs = new Date(internship.internship_end_date);
    const fromDate = (fromDateJs.getDate() + "/" + (fromDateJs.getMonth() + 1) + "/" + fromDateJs.getFullYear());
    const toDate = (toDateJs.getDate() + "/" + (toDateJs.getMonth() + 1) + "/" + toDateJs.getFullYear());

    return (
        <>
            {(!loading) ? (
                <>
                    <tr className=' mx-auto my-8 max-w-md md:max-w-7xl rounded-xl shadow-md border-gray-600 border-0  p-10 '>
                        <td>
                            {showDetails ? (
                                <AiOutlineUp onClick={() => setShowDetails(false)} className='mx-2 fill-primary cursor-pointer' size={25} />) :
                                (<AiOutlineDown onClick={() => setShowDetails(true)} className='mx-2 fill-primary cursor-pointer' size={25} />)}

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
                            <p className=''>{internship.internship_mode + "/" + internship.training_type}</p>
                        </td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <div className='flex flex-row justify-center flex-nowrap ml-auto mr-5 mt-3 sm:mt-5 text-center'>
                                <button className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3">
                                    <AiOutlineCheck className='fill-green-700' size={26} /> 
                                    {/* <span>Approve</span> */}
                                </button>
                                <button className="flex bg-red-300 rounded-2xl py-1 px-2  flex-row mx-3">
                                    <AiOutlineClose className='fill-red-700' size={26} /> 
                                    {/* <span>Decline</span> */}
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className={showDetails ? "h-28 border-b-4" : "hidden"}>
                        <td ></td>
                        <td colSpan={4}>
                            <div className='m-6'>
                                <p className='font-light'>Email : <span className='bg-gray-200 p-2 m-2 border rounded-lg'>{student.email}</span></p>
                                <br />
                                <p className='font-light'>Course :<span className='bg-gray-200 p-2 m-2 border rounded-lg'>{student.course}</span></p>

                                <p className='my-6'><span className='font-medium pr-2'>Mentor Name:</span><span className='bg-gray-200 p-2 m-2 border rounded-lg'>{internship.company_person_name}</span></p>

                                <div className='flex flex-row'>
                                    <span className=''>Attachments - Offer Letter</span>
                                    <span className='cursor-pointer'><AiOutlineDownload className='fill-primary' size={28} /></span>
                                </div>

                                {/* table for showing team members with their details */}

                                <div className='my-6'>
                                    <p>Team members : <span className='bg-gray-200 m-2 p-2 border rounded-lg'>None</span></p>
                                    <table className='mt-3'>
                                        <thead>
                                            <tr>
                                                <th className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>Name</div>
                                                </th>
                                                <th className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>Roll No</div>
                                                </th>
                                                <th className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>Email</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>Team member 1</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>AM.EN.U4ELC21167</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>testmail@mail.co.in</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>Team member 2</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>AM.EN.U4EAC21257</div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>testmail@mail.co.in</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </td>
                    </tr>
                </>
            ) : (
                <>
                    <AiOutlineLoading3Quarters className='fill-primary my-10 mx-auto animate-spin' size={32} />
                </>
            )
            }
        </>
    )
}