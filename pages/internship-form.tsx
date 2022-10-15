import React, { useState } from "react";
import Navbar from "../components/Navbar";

function internshipForm() {
  const [formValues, setFormValues] = useState([{ name_member: "", email_member: "", roll_member: "" }])
  const handleChange = (i, e) => {
    
    let data = [...formValues];
    data[i][e.target.name] = e.target.value;
    setFormValues(data);
    console.log(e.target.name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log(data);
  }

  let addFormFields = () => {
    setFormValues([...formValues, { name_member: "", email_member: "", roll_member: "" }]);
  }

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  const [status, setStatus] = React.useState(false)

  const radioHandler = () => {
    if (status === false) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  };

  return (
    <>

      <Navbar/>

      <div className="bg-secondary h-screen w-full relative p-2 md:text-lg">

        <div className="w-11/12 mx-auto max-w-5xl my-6 pt-5 pb-10 bg-slate-700/80 flex flex-col z-10 shadow-xl rounded-lg p-5">

          <form
            onSubmit={handleSubmit}
            className="w-full">

            {/* company name and location input  */}
            <div className="mt-10 mb-4 mx-2 text-white font-semibold uppercase text-xl">Internship Details</div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-name">
                  Company Name
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-company-name" type="text" placeholder="Company Name" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-location">
                  Company Location
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-company-location" type="text" placeholder="Company Location" />
              </div>
            </div>

            {/* mentor name and email input */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-name">
                  Mentor Name
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-name" type="text" placeholder="Mentor Name" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-email">
                  Mentor email
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-email" type="email" placeholder="Mentor Email" />
              </div>
            </div>

            {/* mentor contact number + nature of training */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-contact">
                  Mentor Contact
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-contact" type="text" placeholder="Mentor Contact" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-nature">
                  Nature of training
                </label>
                <div className="relative">
                  <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-internship-nature" defaultValue={"Select Option"}>
                    <option disabled >Select Option</option>
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
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* start and end date of internship + internship  */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-start-date">
                  Start Date
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-start-date" type="date" placeholder="Start Date" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-end-date">
                  End Date
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-end-date" type="date" placeholder="End Date" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-mode">
                  Internship Mode
                </label>
                <div className="relative">
                  <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-internship-mode" defaultValue={"Select Option"}>
                    <option disabled>Select Option</option>
                    <option>Offline</option>
                    <option>Online</option>
                    <option>Hybrid</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* internship offer letter upload option and form submit button */}
            <div className="flex flex-wrap -mx-3 mb-2 items-center justify-between">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-certificate">
                  Internship Offer Letter (optional)
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-mentor-email" type="file" placeholder="Mentor Email" />
              </div>
            </div>

            {/* for adding group members for internship */}
            <div className="flex my-2">
            <input type="checkbox" className="mx-3" id="release" onClick={radioHandler} />
            <label className="block uppercase tracking-wide text-white text-xs font-bold" htmlFor="release">
              Add Member for Internship
            </label>
            </div>
            <div style={{ display: status ? 'block' : 'none' }}>
              {formValues.map((element, index) => (
                <div className="flex flex-wrap -mx-3 mb-6" key={index}>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="name_member" >
                      Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="name_member" id="name_member" type="input" placeholder="Student Name" onChange={e => handleChange(index, e)} />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="email_member">
                      Email Id
                    </label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email_member" id="email_member" type="email" placeholder="abc@am.students.amrita.edu" onChange={e => handleChange(index, e)} />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="roll_member">
                      Roll No.
                    </label>
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="roll_members" id="roll_member" type="input" placeholder="AM.XX.XX.XXXXX" onChange={e => handleChange(index, e)} />
                  </div>
                  {
                    index ?
                      <button type="button" className="button remove py-2 px-2 text-white bg-primary rounded-lg font-base" onClick={() => removeFormFields(index)}>Remove</button>
                      : null
                  }
                </div>
              ))}
              <button className="button add py-2 px-2 text-white bg-primary rounded-lg font-base" type="button" onClick={() => addFormFields()}>Add</button>
            </div>

            {/* form submit button */}
            <div className=" flex justify-end  px-3 mb-6 md:mb-0 mt-2">
              <button className="py-3 px-5 bg-primary rounded-lg font-semibold text-white" type="submit">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default internshipForm;