import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCardMembership } from "react-icons/md";
import ApprovalDisapprovalPending from "./ApprovalDisapprovalPending";
import ApprovalDisapprovalCompletion from "./ApprovalDisapprovalCompletion";
import internal from "stream";

export default function DetailModal({ closeModal, info, setIsDone }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    fetch(`/api/student/${info.user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const resData = await res.json();
      if (resData.success) {
        setUser(resData.data);
      }
      // console.log(resData.data);
    });
  }, []);

  const toDate = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };
  let member = info.member == null ? null : JSON.parse(info.member);
  console.log(info.member);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => closeModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-5 text-gray-900"
                      >
                        Details:
                      </Dialog.Title>
                      <div className="mt-1 ml-2">
                        <div className="">
                          <div className="flex">
                            <p className="text-lg font-semibold m-1 w-auto">
                              Student Details
                            </p>
                          </div>
                          {user !== "" ? (
                            <div>
                              <div className="flex mb-2 mt-1">
                                <p className="text-base text-gray-700 ml-2 w-1/3">
                                  Name :{" "}
                                </p>
                                <span className="text-black w-2/3">{info.name}</span>{" "}
                              </div>

                              <div className="flex mb-2" >
                                <p className="text-base text-gray-700 ml-2 w-1/3">
                                  Roll No. :{" "}

                                </p>
                                <span className="w-2/3"> {user.rollno} </span>
                              </div>
                              <div className="flex mb-2">
                                <p className="text-base text-gray-700 ml-2 w-1/3">
                                  Course/Branch:{" "}

                                </p>
                                <span className="text-black w-2/3">
                                  {user.course} - {user.branch}
                                </span>
                              </div>
                              <div className="flex mb-2">

                                <p className="text-base text-gray-700 ml-2 w-1/3">
                                  School:{" "}
                                </p>
                                <span className="text-black w-2/3">
                                  {user.school}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <AiOutlineLoading3Quarters
                              className="fill-primary animate-spin my-4 ml-4"
                              size={36}
                            />
                          )}
                        </div>
                        <div className="mt-3 ">
                          <p className="text-lg font-semibold ">
                            Internship Details
                          </p>
                          <div className="flex mb-2 mt-2">

                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Company :{" "}
                            </p>
                            <span className="w-2/3">
                              <span className="text-black">
                                {info.company_name}
                              </span>{" "}
                              <span>
                                ({" "}
                                <a
                                  className="text-blue-500"
                                  href={`${info.company_website}`}
                                >
                                  {" "}
                                  {info.company_website}{" "}
                                </a>
                                )
                              </span>
                            </span>
                          </div>
                          <div className="flex mb-2">
                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Location :{" "}
                            </p>
                            <span className="text-black w-2/3">
                              {info.company_location}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Contact :{" "}
                            </p>
                            <span className="text-black w-2/3">
                              {info.company_mobile}
                            </span>

                          </div>
                          <div className="flex mb-2">
                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Mode :{" "}
                            </p>
                            <span className="text-black w-2/3">
                              {info.internship_mode}
                            </span>

                          </div>
                          <div className="flex mb-2">
                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Training Type :{" "}
                            </p>
                            <span className="text-black w-2/3">
                              {info.training_type}
                            </span>
                          </div>
                          <div className="flex mb-2">
                            <p className="text-base text-gray-700 ml-2 w-1/3">
                              Dates :{" "}
                            </p>
                            <span className="text-black w-2/3">
                              {toDate(info.internship_start_date)} -{" "}
                              {toDate(info.internship_end_date)}
                            </span>

                          </div>
                        </div>
                        <div>
                          
                          {member !== null ? (

                            <div>
                              <p className="text-base mt-1 font-semibold">
                                Team members :
                                <span className="bg-gray-100/70 p-2 mx-2 my-1 rounded-lg" >{member.length}</span>
                              </p>
                              {member.map((members) => {
                                return (
                                  <>
                                    <div className="border-2 border-gray-200 shadow-md rounded-md my-2 mx-3 p-2">
                                      <p className="text-base text-gray-700 ml-2  ">
                                        Name:<span className="text-black">
                                          {members.name_member}
                                        </span>

                                      </p>
                                      <p className="text-base text-gray-700 ml-2">
                                        Roll number:{" "}
                                        <span className="text-black">
                                          {members.roll_member}
                                        </span>
                                      </p>
                                      <p className="text-base text-gray-700 ml-2">
                                        Email:{" "}
                                        <span className="text-black">
                                          {members.email_member}
                                        </span>
                                      </p>
                                    </div>
                                  </>
                                )
                              }
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <p className="text-base font-semibold w-1/3">
                                Team members: {" "}
                              </p>
                              <span className="bg-gray-100/60 p-2  rounded-md font-normal w-2/3">
                                None
                              </span>

                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse md:px-6">
                  <button
                    type="button"
                    className="inline-flex h-10 bottom-5 justify-center rounded-md border border-transparent bg-primary px-4 py-2 font-medium text-white shadow-base hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 ml-3 w-auto text-base"
                    onClick={() => closeModal(false)}
                  >
                    OK
                  </button>
                  {/* <div className="absolute left-0 inline-flex h-55">
                    
                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-base hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-base"
                    onClick={() => (closeModal(false))}>
                      Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-base hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-base"
                    onClick={() => closeModal(false)}>
                      Disapprove
                  </button>
                  </div> */}
                  {info.approved==="Pending" ? (
                  <div className="absolute left-0 bottom-1">
                    <ApprovalDisapprovalPending
                      internship={info}
                      isApproved={false}
                      setIsDone={setIsDone}
                      showModal={closeModal}
                    />
                  </div>
                  ):info.approved==="Pending Verification" && (
                    <div className="absolute left-0 bottom-1">
                    <ApprovalDisapprovalCompletion
                      internship={info}
                      isApproved={false}
                      setIsDone={setIsDone}
                    />
                  </div>
                  )
}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
