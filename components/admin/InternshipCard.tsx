import { useEffect, useState, Fragment } from 'react';
import { AiOutlineCheck, AiOutlineDown, AiOutlineUp, AiOutlineClose, AiOutlineDownload, AiOutlineLoading3Quarters } from 'react-icons/ai';
import Link from 'next/link';
// modal
import { Dialog, Transition } from '@headlessui/react'


export default function InternshipCard({ internship }) {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    //modal
    let [isOpen, setIsOpen] = useState(false)
    let [approve, setApprove] = useState("")

    function handleApprove() {
        setIsOpen(true)
        setApprove("approve")
    }

    function handleDisapprove() {
        setIsOpen(true)
        setApprove("disapprove")
    }

    function closeModal() {
        setIsOpen(false)
    }
    function approved() {
        const userObject = {
            _id: internship._id,
            approved:"Approved"
        }
        fetch("/api/admin/admin_decision", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject),
        }).then(async (res) => {
            const resData = await res.json();
            console.log(resData);
            if (resData.success) {
                setIsOpen(false)
                window.location.reload();
            }
        });
    }

    const handleDecline=(e)=>{ 

        const data = Object.fromEntries(new FormData(e.target).entries());
        const userObject = {
            _id: internship._id,
            approved:"Disapproved",
            admin_remarks:data.remark
        }
        fetch("/api/admin/admin_decision", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject),
        }).then(async (res) => {
            const resData = await res.json();
            console.log(resData);
            if (resData.success) {
                setIsOpen(false)
                window.location.reload();
            }
        });
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {
        // console.log(internship);
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
            //console.log(resData.data.name,internship.name);
            setStudent(resData.data);
            if (student) {
                setLoading(false);
            }
        });
    }, [student])

    let member = internship.member == null ? null : JSON.parse(internship.member);

    const fromDateJs = new Date(internship.internship_start_date);
    const toDateJs = new Date(internship.internship_end_date);
    const fromDate = (fromDateJs.getDate() + "/" + (fromDateJs.getMonth() + 1) + "/" + fromDateJs.getFullYear());
    const toDate = (toDateJs.getDate() + "/" + (toDateJs.getMonth() + 1) + "/" + toDateJs.getFullYear());


    return (
        <>
            {(!loading) ? (
                <>
                    {/* modal */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                {`Are you sure you want to ${approve} this internship?`}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {approve === "approve" ? "This will autogenerate the letter for the student" : "Kindly provide remarks stating the reason for disapproval"}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                {approve === "approve" ? (
                                                    <>
                                                        <div className='flex justify-around'>
                                                            <button
                                                                onClick={approved}
                                                                className='bg-green-400 border rounded-lg p-3'>
                                                                Yes
                                                            </button>
                                                            <button
                                                                onClick={closeModal}
                                                                className='bg-red-300 border rounded-lg p-3'>
                                                                No
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='flex justify-around'>
                                                            <form onSubmit={handleDecline}>
                                                                <label>
                                                                    {/* Remarks: */}
                                                                    {/* <input type="text" name="name" className='border border-black' placeholder='Remarks' /> */}
                                                                    <textarea className='border border-black p-2' id="story" name="remark"
                                                                        rows={3} cols={33}>
                                                                    </textarea>
                                                                </label>
                                                                <br />
                                                                <br />
                                                                <div className='flex justify-center bg-primary text-white border rounded-lg'>
                                                                    <label>
                                                                        <input type="submit" value="Submit"  />
                                                                    </label>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </>
                                                )
                                                }
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
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
                                <button onClick={handleApprove} className="flex bg-green-400 rounded-2xl py-1 px-2 flex-row mx-3 cursor-pointer">
                                    <AiOutlineCheck className='fill-green-700' size={26} />
                                    <span>Approve</span>
                                </button>
                                <button onClick={handleDisapprove} className="flex bg-red-300 rounded-2xl py-1 px-2 flex-row mx-3 cursor-pointer">
                                    <AiOutlineClose className='fill-red-700' size={26} />
                                    <span>Decline</span>
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
                                    <Link href={internship.request_letter != null ? internship.request_letter : ""}><AiOutlineDownload className='fill-primary cursor-pointer' size={28} /></Link>
                                </div>

                                {/* table for showing team members with their details */}

                                <div className='my-6'>
                                    {internship.member != null ? (
                                        <>
                                            <p>Team members : <span className='bg-gray-200 m-2 p-2 border rounded-lg'>{member.length}</span></p>
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
                                                    {member.map((members) => {
                                                        //console.log(member)
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                                        <div className='text-sm text-gray-900'>{members.name_member}</div>
                                                                    </td>
                                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                                        <div className='text-sm text-gray-900'>{members.roll_member}</div>
                                                                    </td>
                                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                                        <div className='text-sm text-gray-900'>{members.email_member}</div>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                </tbody>

                                            </table>
                                        </>
                                    ) : (
                                        <>
                                            <p>Team members : <span className='bg-gray-200 m-2 p-2 border rounded-lg'>None</span></p>
                                        </>
                                    )
                                    }
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