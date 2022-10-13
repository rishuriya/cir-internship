import React from "react";


function studentForm() {
    let date_ob = new Date();
    var year = date_ob.getFullYear()


  return (
  <div className="bg-secondary h-screen w-full relative p-2">
    
    <div className="w-11/12 mx-auto max-w-5xl my-24 pt-5 pb-10 bg-slate-700/80 flex flex-col z-10 shadow-xl rounded-lg p-5">

     <form className="w-full">
      <div className="my-3 mx-2 text-white font-semibold uppercase">Personal Details</div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="name">
            Full name
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" placeholder=""/>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-gender">
            Gender
          </label>
          <div className="relative">
            <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-gender">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="email">
            Email
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder=""/>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="phone-number">
            Phone No.
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pnone-number" type="text" placeholder=""/>
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
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="roll">
            Roll Number
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="roll" type="text" placeholder="AM.XX.XXXXXXX"/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-course">
            Course
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-course">
              <option>Select Course</option>
              <option>B.Tech</option>
              <option>M.tech</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
            Batch
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>Selct Specialization</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-sem">
            Present Semester
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-sem">
              <option>Select Semester</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
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
              <option>{year-1}</option>
              <option>{year-2}</option>
              <option>{year-3}</option>
              <option>{year-4}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-4 mx-2 text-white font-semibold uppercase">Internship Details</div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-name">
            Company Name
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-company-name" type="text" placeholder="Company Name"/>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-location">
            Company Location
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-company-location" type="text" placeholder="Company Location"/>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-name">
            Mentor Name
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-name" type="text" placeholder="Mentor Name"/>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-email">
            Mentor email
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-email" type="email" placeholder="Mentor Email"/>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-contact">
            Mentor Contact
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-contact" type="text" placeholder="Mentor Contact"/>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-nature-training">
            Nature of training
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-internship-nature">
              {/* <option>Select Course</option> */}
              <option>Internship</option>
              <option>In-plant training</option>
              <option>Industrial training</option>
              <option>Project</option>
              <option>Industrtial Visit</option>
              <option>KYE</option>
              <option>SSR</option>
              <option>Place com</option>
              <option>Any other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-start-date">
            Start Date
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-start-date" type="date" placeholder="Start Date"/>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-end-date">
            End Date
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-end-date" type="date" placeholder="End Date"/>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-mode">
            Internship Mode
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-sem">
              <option>Offline</option>
              <option>Online</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-certificate">
            Internship Certificate
          </label>
          <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-email" type="file" placeholder="Mentor Email"/>
        </div>
      </div>

    </form>
    </div>
    </div>
  );
}

export default studentForm;