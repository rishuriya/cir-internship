import cookie from "js-cookie";
import { useRouter } from "next/router";
import { ImSpinner2 } from "react-icons/im";
import { getUser } from '../../utils/getUser'
import React, { useEffect, useState } from "react";
import { MdOutlineEditOff, MdOutlineModeEditOutline } from "react-icons/md";

function StudentForm() {
  let date_ob = new Date();
  var year = date_ob.getFullYear()
  const router = useRouter()

  const user = cookie.get("token");
  const [course, setCourse] = useState("");
  const [School, setSchool] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoll, setUserRoll] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [courseList,setCourseList]=useState([]);
  const [schoolList,setSchoolList]=useState([]);
  const [branchList,setBranchList]=useState([]);
  const [semList,setSemList]=useState([]);
  const handleCourseChange = (e) => {
    setCourse(e.target.value);
    const schoolname={
      school_name:School,
      course:e.target.value,
    }
    fetch(`/api/student/showBranch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8 ",
      },

      body: JSON.stringify(schoolname),
    }).then(async (res) => {
        const resData = await res.json()
        console.log(resData);
        if(resData.success){
          setBranchList(resData.branch)
        }
        })
  }
  const handleBranchChange = (e) => {
    setCourse(e.target.value);
    const schoolname={
      school_name:School,
      course:course,
      branch:e.target.value
    }
    fetch(`/api/student/showBranch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8 ",
      },

      body: JSON.stringify(schoolname),
    }).then(async (res) => {
        const resData = await res.json()
        console.log(resData);
        if(resData.success){
          
          if(resData.branch.length==1){
          var a=Array.from({ length: resData.branch[0].semester }, (_, i) => i + 1);
          setSemList(a);
          }
        }
        })
  }
  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    const schoolname={
      school:e.target.value
    }
    fetch(`/api/student/showCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf8 ",
      },

      body: JSON.stringify(schoolname),
    }).then(async (res) => {
        const resData = await res.json()
        console.log(resData);
        if(resData.success){
          setCourseList(resData.course)
        }
        //handleCourseChange(e);
        })
  }
  useEffect(()=>{
try{
  fetch(`/api/student/showSchool`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf8 ",
    },
  }).then(async (res) => {
      const resData = await res.json()
      console.log(resData);
      if(resData.success){
        setSchoolList(resData.course)
      }
      })
}catch (err) {
  console.log(err);
}
  },[])
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      
      const token =cookie.get('token') || "";
      const data = Object.fromEntries(new FormData(e.target).entries());
      const bodyObject={
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
        profile_completed: true
      };
      //console.log(bodyObject);
      const res = await fetch("/api/student/userdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",'authorisation': `${token}`
        },
        body: JSON.stringify(bodyObject),
      });
      const resData = await res.json();
      if(resData.success){
        router.push("/user");
      }
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  useEffect(() => {
      if(user===null){
        router.push("/login");
      }else{
        getUser(user).then(async(response) => {
          setUserEmail(response.user["email"]);
          setUserName(response.user["name"]);
          setUserRoll(response.user["rollno"]);
        });
      }
    }
  )

  return (
    <div className="bg-secondary h-screen w-full relative p-2">

      <div className="w-11/12 mx-auto max-w-5xl my-6 pt-5 pb-10 bg-slate-700/80 flex flex-col z-10 shadow-xl rounded-lg p-5">

        <form
          onSubmit={handleSubmit}
          className="w-full">
          <div className="my-3 mx-2 text-white font-semibold uppercase"onClick={() => setEditDetail(!editDetail)}>
          
              Personal Details 
             
              
              </div>
          <div className="flex flex-wrap -mx-3 mb-6" >
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2 text-white" htmlFor="name">
                Full name
              </label>
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="name" id="name" type="text" placeholder="Full Name" value={userName}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-gender">
                Gender
              </label>
              <div className="relative">
                <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="gender" id="grid-gender" defaultValue={"Select Gender"} required>
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
              {/* <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" id="email" type="email" placeholder="abc@am.students.amrita.edu" value={userEmail}/> */}
              <input pattern=".*@am\.students\.amrita\.edu" required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" id="email" type="email" placeholder="abc@am.students.amrita.edu" value={userEmail}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="phone-number">
                Phone No.
              </label>
              <input pattern="[0-9,+]{10,15}" title="Type numbers without spaces/Number invalid" required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="phone" id="phone-number" type="text" placeholder="Phone number"/>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-school">
                School
              </label>
              <div className="relative">
                <select className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="school" id="grid-school" defaultValue={'Select School'} onChange={handleSchoolChange} required>
                {schoolList.length==0?(<>
                  <React.Fragment><option disabled >Select School</option></React.Fragment></>):(<><React.Fragment>
                    <option disabled>Select School</option>
                    {schoolList.map((school) => {
                      return (<>
                      <option value={school.school_name}>{school.school_name}</option>
                    </>)})}</React.Fragment> </> )}
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
              <input required className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="roll" id="roll" type="text" placeholder="AM.XX.XXXXXXX" value={userRoll} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-course">
                Course
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="course" id="grid-course" required defaultValue={"Select Course"}
                  onChange={handleCourseChange} >
                   {courseList.length==0?(<>
                    <React.Fragment> <option disabled >Select Course</option></React.Fragment> </>):(<>
                      <React.Fragment> <option disabled>Select Course</option>
                    {courseList.map((school) => {
                      return (<>
                      <option>{school.course_name}</option>
                    </>)})} </React.Fragment> </> )}
                </select>
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
                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="branch" id="grid-branch" required defaultValue={"Select Specialization"} onChange={handleBranchChange}>
                {branchList.length==0?(<>
                    <React.Fragment> <option disabled >Select Specialization</option></React.Fragment> </>):(<>
                      <React.Fragment> <option disabled>Select Specialization</option>
                    {branchList.map((school) => {
                      return (<>
                      <option>{school.branch}</option>
                    </>)})} </React.Fragment> </> )}
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
                <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="sem" id="grid-sem" defaultValue={"Select Semster"}>
                  {semList.length==0?(<>
                    <React.Fragment> <option disabled >Select Semster</option></React.Fragment> </>):(<>
                      <React.Fragment> <option disabled>Select Semster</option>
                    {semList.map((school) => {
                      return (<>
                      <option>{school}</option>
                    </>)})} </React.Fragment> </> )}
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
                <select required className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="year_of_joining" id="grid-joining-year">
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
            {!loading?<button type="submit" className="px-5 py-3 bg-primary text-white rounded-md text-lg font-medium my-5">
              Submit
            </button>:
            <div className="bg-slate-400/50 px-6 mt-3 ">
              <ImSpinner2  className="animate-spin my-3 fill-primary " size={30}/>
            </div>
            }
          
          </div>

        </form>
      </div>
    </div>
  );
}

export default StudentForm;