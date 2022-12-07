import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Console } from "console";
import {GrAddCircle} from "react-icons/gr";


export default function DetailModal({ closeModal }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const cancelButtonRef = useRef(null);
  const [newSchoolValue,setNewSchoolValue] = useState(null);
  const [newCourseValue,setNewCourseValue] = useState(null);

  const takeUserDetail=(isSchool)=>{
    if(isSchool){
      const inputValue = window.prompt("Enter the name of the school", "School of ")  ;
      console.log(inputValue);
      setNewSchoolValue(inputValue)
    }else{
      const inputValue = window.prompt("Enter the new Course", "")  ;
      // console.log(inputValue);
      setNewCourseValue(inputValue)
    }
    
  }

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
                        Add School/Course
                      </Dialog.Title>

                      <div className="flex flex-col space-y-4 my-5">
                        {/* School addition dropdown */}
                        <div className="flex flex-row">
                        <div className="relative">
                          <select
                            required
                            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="training_type"
                            id="grid-internship-nature"
                            defaultValue={"Select Option"}
                          >
                            <option disabled></option>
                            <option>School of Engneering</option>
                            <option>School of Arts and Science</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                          <div className=""  onClick={()=>takeUserDetail(true)}>
                          <GrAddCircle size={26} className="p-2 h-10 w-10 mx-2 cursor-pointer rounded-lg "/>
                          </div>
                        </div>

                        {/* Course Addition dropdown */}
                        <div className="flex flex-row">
                        <div className="relative">
                          <select
                            required
                            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            name="training_type"
                            id="grid-internship-nature"
                            defaultValue={"Select Option"}
                          >
                            <option disabled></option>
                            <option>Bachelore's of Technology</option>
                            <option>Masters's of Technology</option>
                            <option>PHD</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                        <div className="" onClick={()=>takeUserDetail(false)}>
                          <GrAddCircle size={26} className="p-2 h-10 w-10 mx-2 cursor-pointer rounded-lg "/>
                        </div>
                        </div>
                        
                      <div className="w-full mb-2 md:mb-0">
                        <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" name="branch_name" id="grid-branch-name" type="text" placeholder="Branch Name" />
                      </div>

                      <div className="relative w-1/2">
                  
                    <select
                      required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
                     focus:bg-white focus:border-gray-500" name="sem" id="grid-sem" 
                      // onChange={(e) => setSem(e.target.value)}
                      // disabled={!editDetail}
                    >
                      <option disabled>Number of semesters</option>
                      <React.Fragment>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                          </React.Fragment>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
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
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 bottom-5 justify-center rounded-md border-2 border-gray-400 px-4 py-2 font-medium shadow-base focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 ml-3 w-auto text-base"
                    onClick={() => closeModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
