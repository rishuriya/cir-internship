import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import { ImSpinner2 } from "react-icons/im";
import { getUser } from '../../utils/getUser'
import { useEffect } from 'react'
import setUser from "../../utils/setUser";
import { MdReportGmailerrorred } from "react-icons/md";
import {MdOutlineEditOff, MdOutlineModeEditOutline} from 'react-icons/md'


function InternshipForm() {
  const [formValues, setFormValues] = useState([{ name_member: "", email_member: "", roll_member: "" }])
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [course, setCourse] = useState("");
  const [data, setData] = useState(false);
  const [user, setUserToken] = useState([]);
  const [userRoll, setUserRoll] = useState("");
  const [editDetail,setEditDetail] = useState(false);
  const [username,setUserName]=useState([]);
  let user_name
  let date_ob = new Date();
  var year = date_ob.getFullYear()
  let member_data
  let id;
  let name;
  let roll;
  let fileres;
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

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  }

  useEffect(() => {
    const token = cookie.get("token");
    getUser(token).then(async(response) => {
      id=response.user["id"];
      name=response.user["name"];
      roll=response.user["rollno"];
      setUserToken([response.user]);
      // console.log(user);
      fetch(`../api/student/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
      }).then(async (res) => {
        const resData=await res.json()
      user_name= resData.data 
      if(user_name)
      {
        setCourse(user_name["course"]);
        setUserName(user_name);
        setData(true);
      }       
    });
    });
  },[data]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
            
      const data = Object.fromEntries(new FormData(e.target).entries());
      // console.log(data)
      if(image!=null){
      const body = new FormData();
      body.append("file", image);
      body.append("id",user[0]["id"]);
      const response = await fetch("/api/student/file", {
      method: "POST",
      body
    });
  
     fileres = await response.json();
  }
      if(formValues[0].name_member=="" || formValues[0].email_member=="" || formValues[0].roll_member==""){
        member_data=null;
      }
      else{
        member_data=JSON.stringify(formValues)
      }
      const bodyObject={
        user: user[0]["id"],
        name: user[0]["name"],
        roll: user[0]["rollno"],
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
      const userObject={
        name: data.name,
        email: data.email,
        gender: data.gender,
        school: data.school,
        rollno: data.roll,
        course:data.course,
        branch: data.branch,
        semester: data.sem,
        phone: data.phone,
        year_of_joining: data.year_of_joining,
      };
      //console.log(bodyObject);
      const resUser = await fetch("/api/student/userdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(userObject),
      });
      const resUserData = await resUser.json();
      const res = await fetch("/api/student/internship-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
        body: JSON.stringify(bodyObject),
      });
      const resData = await res.json();
      if(resData.success && resUserData.success){
        router.push("/user"
        );
        setLoading(false);
        return;
      }else{
        if(resData.error){
          setError(resData.error);
        }
        setError("Something went wrong");
        setLoading(false);
        return;
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

  let validatingContacs = (text) => {
      // var contact =  /^\d{1}|\+{1}? ?\d+$/;
      // if(text.value.match(contact)){
      //   return true;
      // }
      // else{
      //   return false;
      // }
      const regex = new RegExp('^\d{1}|\+{1}? ?\d+$');   
  }

  return (
    <>

      <Navbar/>

      <div className="bg-secondary h-screen w-full relative p-2 md:text-lg">

        <div className="w-11/12 mx-auto max-w-5xl my-6 pt-5 pb-10 bg-slate-700/80 flex flex-col z-10 shadow-xl rounded-lg p-5">

          <form
            onSubmit={handleSubmit}
            className="w-full">

              {/* Personal Details  */}
          <div className="my-3 mx-2 text-white font-semibold uppercase flex flex-row">
            Personal Details
            <div onClick={()=>setEditDetail(!editDetail)} className=" mx-3">{
                editDetail?
                <MdOutlineModeEditOutline size={24}/>:
                <MdOutlineEditOff size={24}/>
              }
            </div>
            </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="name">
                Full name
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
              name="name" id="name" type="text" placeholder="Full Name" value={username["name"]} readOnly/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-gender">
                Gender
              </label>
              <div className="relative">
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="gender" id="grid-gender" value={username["gender"]} required readOnly>
                  {/* <option disabled>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option> */}
                </input>
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
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" id="email" type="email" placeholder="abc@am.students.amrita.edu" defaultValue={username["email"]} readOnly/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="phone-number" >
                Phone No.
              </label>
              <input pattern="[0-9,+]{10,15}" title="Number Invalid/Enter number without spaces" required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="phone" id="phone-number" type="text" placeholder="Phone number" defaultValue={username["phone"]} readOnly/>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-school">
                School
              </label>
              <div className="relative">
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="school" id="grid-school" required defaultValue={username["school"]} readOnly>
                  {/* <option value="Amrita School Of Engineering">Amrita School Of Engineering</option>
                  <option value="Amrita School Of Arts and Science">Amrita School Of Arts and Science</option> */}
                </input>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="roll">
                Roll Number
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="roll" id="roll" type="text" placeholder="AM.XX.XXXXXXX" defaultValue={username["rollno"]} readOnly/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-course">
                Course
              </label>
              <div className="relative">
                <input className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="course" id="grid-course" required defaultValue={username["course"]} readOnly >
                  {/* <option disabled >Select Course</option>
                  <option>B.Tech</option>
                  <option>M.Tech</option> */}
                </input>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-branch">
                Branch
              </label>
              <div className="relative">
                <input className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="branch" id="grid-branch" required defaultValue={username["branch"]} readOnly>
                  {/* {course === "B.Tech" || course === "M.Tech" ? (
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
                  )} */}
                </input>
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
                <input required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="sem" id="grid-sem" defaultValue={username["semester"]} readOnly>
                  {/* <option disabled>Select Semster</option>
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
                  )} */}
                </input>
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
                <input required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="year_of_joining" id="grid-joining-year" defaultValue={username["year_of_joining"]}>
                  {/* <option disabled>Select Year</option>
                  <option>{year}</option>
                  <option>{year - 1}</option>
                  <option>{year - 2}</option>
                  <option>{year - 3}</option>
                  <option>{year - 4}</option> */}
                </input>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>
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
                <input required pattern="[0-9,+]{10,15}" title="Number Invalid/Enter number without spaces" className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="company_mobile" id="grid-mentor-contact" type="text" placeholder="Company Contact" />
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
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="certificate" onChange={uploadToClient} id="grid-internship-certificate" type="file" accept="application/pdf" />
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
                    <input pattern=".*@am\.students\.amrita\.edu" title="Enter valid student Email-id" className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email_member" id="email_member" type="email" placeholder="abc@am.students.amrita.edu" onChange={e => handleChange(index, e)} />
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
            {error !== "" ? (
            <div className="flex bg-red-300/40  border-l-2 border-red-700 my-1 flex-row items-center mx-5">
              <MdReportGmailerrorred size={28} className="fill-red-700" />
              <p className="text-red-700 mx-3 my-2 font-medium">{error}</p>
            </div>
          ) : (
            <></>
          )}
              <button className="py-3 px-5 bg-primary rounded-lg font-semibold text-white" type="submit"> 
               {loading?
                <ImSpinner2
                className="animate-spin my-3 fill-primary"
                size={30}
              />
               :"Submit"} 
              </button>
              
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default InternshipForm;