import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import { getUser } from '../../utils/getUser'
import { useEffect } from 'react'


function InternshipForm() {
  const [formValues, setFormValues] = useState([{ name_member: "", email_member: "", roll_member: "" }])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  let member_data
  let id;
  let name;
  let roll;
  let fileres;
  let user;
  const router = useRouter()

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
    }
  };

  const handleChange = (i, e) => { 
    let data = [...formValues];
    data[i][e.target.name] = e.target.value;
    setFormValues(data);
  }
  useEffect(() => {
    const token = cookie.get("token");
    getUser(token).then(async(response) => {
      id=response.user["id"];
      name=response.user["name"];
      roll=response.user["rollno"];
      user=response.user;
    });
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
            
      const data = Object.fromEntries(new FormData(e.target).entries());

      if(image!=null){
      const body = new FormData();
      body.append("file", image);
      body.append("id", id);
      const response = await fetch("/api/student/file", {
      method: "POST",
      body
    });
  
     fileres = await response.json();
  }
      if(formValues[0].name_member=="" || formValues[0].email_member=="" || formValues[0].roll_member==""){
        member_data=null
      }
      else{
        member_data=JSON.stringify(formValues)
        console.log(member_data)
      }
      const bodyObject={
        user: id,
        name: name,
        roll: roll,
        company_name: data.company_name,
        company_location: data.company_location,
        company_person_name: data.company_person_name,
        company_email: data.company_email,
        company_mobile: data.company_mobile,
        training_type: data.training_type,
        internship_start_date: data.internship_start_date,
        internship_end_date: data.internship_end_date,
        internship_mode: data.internship_mode,
        company_website:data.company_website,
        request_letter:image!=null?fileres.url:null,
        member:member_data
      };
      
      console.log(bodyObject);
      const res = await fetch("/api/student/internship-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(bodyObject),
      });
      const resData = await res.json();
      if(resData.success){
        router.push("/user"
        );
      }

      setLoading(false);
    } catch (e) {
      setError(e);
      console.log(e);
      setLoading(false);
    }
  };

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
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_name" id="grid-company-name" type="text" placeholder="Company Name" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-location">
                  Company Location
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_location" id="grid-company-location" type="text" placeholder="Company Location" />
              </div>
            </div>

            {/* mentor name and email input */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-name">
                  Mentor Name
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_person_name" id="grid-mentor-name" type="text" placeholder="Mentor Name" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-email">
                  Company email
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_email" id="grid-mentor-email" type="email" placeholder="Company Email" />
              </div>
            </div>

            {/* mentor contact number + nature of training */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-mentor-contact">
                  Company Contact
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_mobile" id="grid-mentor-contact" type="text" placeholder="Company Contact" />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-nature">
                  Nature of training
                </label>
                <div className="relative">
                  <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="training_type" id="grid-internship-nature" defaultValue={"Select Option"}>
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
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="internship_start_date" id="grid-start-date" type="date" placeholder="Start Date" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-end-date">
                  End Date
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="internship_end_date" id="grid-end-date" type="date" placeholder="End Date" />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-internship-mode">
                  Internship Mode
                </label>
                <div className="relative">
                  <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="internship_mode" id="grid-internship-mode" defaultValue={"Select Option"}>
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
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="certificate" onChange={uploadToClient} id="grid-internship-certificate" type="file" />
              </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-company-website">
                  Company Website
                </label>
                <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_website" id="grid-company-website" type="url" placeholder="Company Website" />
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
                    <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="roll_member" id="roll_member" type="input" placeholder="AM.XX.XX.XXXXX" onChange={e => handleChange(index, e)} />
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

export default InternshipForm;