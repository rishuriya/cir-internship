import { useState } from "react";
import { RootState } from '../store'
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

function studentForm() {
  let date_ob = new Date();
  var year = date_ob.getFullYear()
  const router = useRouter()

  const user = useSelector((state: RootState) => state.user.value)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    router.push("/");
    // setTimeout(() => {
    //   console.log("Submitted");
      
    // }, 2000)
  }

  const [course, setCourse] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
      if(user===null){
        router.push("/login");
      }else{
        setUserName(user["name"]);
        setUserEmail(user["email"]);
      }
    }
  )

  return (
    <div className="bg-secondary h-screen w-full relative p-2">

      <div className="w-11/12 mx-auto max-w-5xl my-6 pt-5 pb-10 bg-slate-700/80 flex flex-col z-10 shadow-xl rounded-lg p-5">

        <form
          onSubmit={handleSubmit}
          className="w-full">
          <div className="my-3 mx-2 text-white font-semibold uppercase">Personal Details</div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="name">
                Full name
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder="Full Name" value={userName}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-gender">
                Gender
              </label>
              <div className="relative">
                <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-gender" defaultValue={"Select Gender"}>
                  <option disabled>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="email">
                Email
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder="abc@am.students.amrita.edu" value={userEmail}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="phone-number">
                Phone No.
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="phone-number" type="text" placeholder="Phone number" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-school">
                School
              </label>
              <div className="relative">
                <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-school">
                  <option>Amrita School Of Engineering</option>
                  <option>Amrita School Of Arts and Science</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="roll">
                Roll Number
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="roll" type="text" placeholder="AM.XX.XXXXXXX" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-course">
                Course
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-course" defaultValue={"Select Course"}
                  onChange={handleCourseChange} >
                  <option disabled >Select Course</option>
                  <option>B.Tech</option>
                  <option>M.Tech</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                Batch
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" defaultValue={"Select Specialization"}>
                  {course === "B.Tech" || course === "M.Tech" ? (
                    course === "B.Tech" ? (
                      <React.Fragment>
                        <option disabled>Select Specialization</option>
                        <option>AIE - Artificial Intelligence</option>
                        <option>CSE - Computer Science</option>
                        <option>ECE - Electronics & Communication</option>
                        <option>EAC - Electronics & Computer</option>
                        <option>ELC - Electrcial & Computer</option>
                        <option>EEE - Electrcial & Electronics</option>
                        <option>MEE - Mechanical Engineering</option>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <option disabled>Select Specialization</option>
                        <option>CS - Computer Science</option>
                        <option>EC - Electronics & Communication</option>
                        <option>EE - Electrcial & Electronics</option>
                        <option>ME - Mechanical Engineering</option>
                      </React.Fragment>
                    )
                  ) : (
                    <React.Fragment>
                      <option disabled>Select Specialization</option>
                    </React.Fragment>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-sem">
                Present Semester
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-sem" defaultValue={"Select Semster"}>
                  <option disabled>Select Semster</option>
                  {course === "B.Tech" || course === "M.Tech" ? (
                    course === "B.Tech" ? (
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
                    ) : (
                      <React.Fragment>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </React.Fragment>
                    )
                  ) : (
                    <React.Fragment>
                      <option disabled>Select B.Tech/M.Tech</option>
                    </React.Fragment>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-joining-year">
                Year Of Joining
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-joining-year">
                  <option>Select Year</option>
                  <option>{year}</option>
                  <option>{year - 1}</option>
                  <option>{year - 2}</option>
                  <option>{year - 3}</option>
                  <option>{year - 4}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-5 py-3 bg-primary text-white rounded-md text-lg font-medium my-5">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default studentForm;