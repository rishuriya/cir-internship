import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import {
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import cookie from "js-cookie";

export default function InternshipCard({ internship, isApproved ,setIsDone,showModal,modalState}) {
  // const [student, setStudent] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [showDetails, setShowDetails] = useState(false);
  // const [isApproved, setIsApproved] = useState(false);
  //modal
  let [isOpen, setIsOpen] = useState(false);
  let [approve, setApprove] = useState("");
  const router = useRouter();
  function handleApprove() {
    //showModal(false)
    setIsOpen(true);
    setApprove("approve");
  }
  function handleDisapprove() {
    setIsOpen(true);
    setApprove("disapprove");
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const token = cookie.get("token") || "";

  function approved() {
    const userObject = {
      _id: internship._id,
      approved: "Approved",
    };
    fetch("/api/admin/admin_decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 'authorisation': `${token}`
      },
      body: JSON.stringify(userObject),
    })
    .then(async (res) => {
      const resData = await res.json();
      if (resData.success) {
        setIsOpen(false);
        setIsDone(true);
        if((confirm('Are you sure you want to download this letter?')==false)){  
          if(modalState==true){
            showModal(false)
            modalState==false
          }
          return;
        }
        router.push(
          {
            pathname: "/admin/company-letter",
            query: { id: internship._id, user: internship.user },
          },
          "/admin/company-letter"
        )
      }
    })
    console.log("stateModal/openModal:",modalState)
  }

  const handleDecline = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const userObject = {
      _id: internship._id,
      approved: "Disapproved",
      admin_remarks: data.remark,
    };
    fetch("/api/admin/admin_decision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",'authorisation': `${token}`
      },
      body: JSON.stringify(userObject),
    }).then(async (res) => {
      const resData = await res.json();
      // console.log(resData);
      if (resData.success) {
        setIsOpen(false);
        setIsDone(true);
      }
    });
    showModal(false)
  };

  return (
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
                      {approve === "approve"
                        ? "This will autogenerate the letter for the student"
                        : "Kindly provide remarks stating the reason for disapproval"}
                    </p>
                  </div>

                  <div className="mt-4">
                    {approve === "approve" ? (
                      <>
                        <div className="flex justify-around">
                          <button
                            onClick={approved}
                            className="bg-green-400 border rounded-lg py-3 px-5"
                          >
                            Yes
                          </button>
                          <button
                            onClick={closeModal}
                            className="bg-red-300 border rounded-lg py-3 px-5"
                          >
                            No
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-around">
                          <form onSubmit={handleDecline}>
                            <label className="flex flex-col">
                              <textarea
                                className="border border-black p-2 mb-4 w-full"
                                id="story"
                                name="remark"
                                rows={3}
                                cols={30}
                                required
                              ></textarea>
                              <button
                                type="submit"
                                className=" bg-primary text-white ml-auto py-2 px-3 text-lg rounded-lg font-medium"
                                
                              >
                                Submit
                              </button>
                            </label>
                          </form>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className=" mx-auto max-w-md md:max-w-6xl border-gray-600 border-0 ">
        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex flex-row justify-center flex-nowrap ml-auto mr-3 mt-1 sm:mt-3 text-center">
            <button
              onClick={handleApprove}
              className="flex bg-green-50 hover:bg-green-200 border-2 border-green-300 rounded-2xl py-2 px-4 flex-row mx-2 cursor-pointer"
            >
              {/* <AiOutlineCheck className="fill-green-700" size={26} /> */}
              <span>Approve</span>
            </button>
            <button
              onClick={handleDisapprove}
              className="flex bg-red-50 hover:bg-red-200 border-2 border-red-300 rounded-2xl py-2 px-4 flex-row mx-2 cursor-pointer"
            >
              {/* <AiOutlineClose className="fill-red-700" size={26} /> */}
              <span>Decline</span>
            </button>
          </div>
        </td>
      </div>
    </>
  );
}
function then(arg0: any) {
  throw new Error("Function not implemented.");
}

