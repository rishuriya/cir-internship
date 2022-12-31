import Link from 'next/link';
import cookie from 'js-cookie';
import Image from "next/image";
import { useState } from 'react';
import { useEffect } from 'react';
import React, { useRef } from 'react';
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";
import { ImSpinner2 } from "react-icons/im";
import { getUser } from '../../utils/getUser'
import Header from '../../public/img/head.png'
import Footer from '../../public/img/Footer.png'

const CompanyLetter = React.forwardRef<HTMLDivElement>(function InternshipLetter(prop, ref) {
  const [username, setUserName] = useState([]);
  const [role, setRole] = useState();
  const router = useRouter()
  const [isDataRecieved, setIsDataRecieved] = useState(false);
  const [data, setData] = useState(false);
  const [internshipdata, setInternshipData] = useState([]);

  let user = router.query.user;
  let internship_id = router.query.id;
  const userid = cookie.get("token");
  let user_name
  let internship_data


  useEffect(() => {
    try {
      const userObject = {
        _id: user
      }
      fetch(`../api/student/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf8 ",
        },
      }).then(async (res) => {
        const resData = await res.json()
        user_name = resData.data
        if (user_name) {
          setUserName(user_name);
          setData(true);
        }
      });
      getUser(userid).then(async(response) => {
        
        setRole(response.user["role"]);
        
      });

      if (username["_id"]) {
        const bodyObject = {
          user: username["_id"],
          _id: internship_id
        }
        //console.log(bodyObject);
        fetch("../api/student/internship", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf8 ",
          },
          body: JSON.stringify(bodyObject),
        }).then(async (res) => {
          const resData = await res.json()
          internship_data = resData.data;
          if (internship_data) {
            setInternshipData(internship_data);
            setIsDataRecieved(true);
          }
        });

      }
    } catch (err) {
      console.log(err);
    }
  }, [isDataRecieved, data]);

  const footerSubContent = ["Engneering","Medicine","Business","Arts & Science","Education","Biotechnology","Dentistry","Pharmacy","Nursing","Communication","Ayurveda"]


  if (isDataRecieved && data) {
    let member = internshipdata["member"] == null ? null : JSON.parse(internshipdata["member"]);
    console.log("member", internshipdata);
    
    return (
      <div className="mx-auto max-w-4xl text-[15px] font-sans relative bg-white" ref={ref} style={{width: 780.7007874, height:1050.519685}}>
        <div className="mt-0 mb-0 text-center">
          {role!="Admin" ?(<>
          <Image src={Header} />
          </>
          ):(
            <>
            <div style={{height:240}}></div> 
            </>
          )
          }
        </div>
       
        <div className='px-4 sm:px-8 mt-10 mb-5' >
        <div className="text-sm text-right mx-8 mb-5">{new Date().toLocaleDateString()}</div>
          <div className='my-5'>
            {
              internshipdata["company_person_name"] == "Whomsoever it may concern"?(
                <>
                <p className='text-center font-semibold py-4'>To whomsoever it may concern</p>
                </>
              ):(<>
                 <p>{internshipdata["company_person_name"]}</p>
                  <p>{internshipdata["company_name"]}</p>
                  {/* <p>Designation</p> */}
                  <p>{internshipdata["company_location"]}</p>
              </>)
            }
           
          </div>
          <div className='my-5 font-semibold'>
            <p>Sub: - Request for Internship for {username["course"]} student.</p>
          </div>
          <div className='my-5'>
            <p>Dear Sir/Madam,</p>
          </div>
          <div className='my-5 mx-0'>
            {username["school"]} is one of the several professional institutions under Amrita Vishwa
            Vidyapeetham, established under section 3 of the UGC Act, 1956. {username["course"]} students
            studying in  {username["school"] === "Amrita School Of Arts and Science" && (<>ASAS</>)} are advised to do Internship in reputed organizations. This will give them some practical
            experience which will contribute substantially to their learning process.
          </div>

          <div>
            {internshipdata["member"] === null && (<>
              <div className="my-5 mx-2">
                {username["gender"] === "Male" && (<>Mr.</>)} {username["gender"] === "Female" && (<>Ms.</>)} {username["name"]} wishes to do {internshipdata["training_type"]} in your esteemed organization. Your acceptance of this
                request will encourage him greatly, and help in enhancing his academic performance.
              </div>
              <div className="my-5 mx-2">
                Course: {username["course"]} Specialization: {username["branch"]} Semester: {username["semester"]}
              </div></>)}
            {internshipdata["member"] !== null && (<><div className="my-5 mx-2">
              The following students wish to do {internshipdata["training_type"]} in your esteemed organization. Your acceptance of this
              request will encourage him greatly, and help in enhancing his academic performance.</div>
              <div className="mb-0 mt-4 mx-2">
                <span>1.</span> {username["name"]}
              </div>{member.map((members, i) => {
                return (<>
                  <div className="my-0 mx-2">
                    <span>{i + 2}.</span> {members.name_member}
                  </div>
                </>)
              })}</>)}
          </div>


          <div className="my-5 mx-2">
            Internship Duration: {internshipdata["internship_start_date"].substring(0, 10)} to {internshipdata["internship_end_date"].substring(0, 10)}
          </div>
          <div className="my-5 mx-2">
            Thanking you,
          </div>
          <div className='flex flex-row justify-between mx-3 items-end mt-6'>
            <div>
              <p>Br. Vishwanathamrita Chaitanya </p>
              <p>Head - Corporate & Industry Relations</p>
              <p>Amritapuri Campus</p>
            </div>
          </div>
          
        </div>
       
      {role!="Admin" ?(
           <div className="flex flex-col justify-between absolute -bottom-16">
             <div className="flex flex-row divide-x text-sm divide-black justify-center mb-2">
              <p className="text-base px-2">Amritapuri</p>
              <p className="text-base px-2">Bengaluru</p>
              <p className="text-base px-2">Coimbatore</p>
              <p className="text-base px-2">Kochi</p>
              <p className="text-base px-2">Mysuru</p>
            </div>
           <div className="flex flex-row divide-x divide-gray-300 text-gray-800 break-normal justify-center">
             {footerSubContent.map((data,i)=>{
               return(
                 <p key={i} className="text-[0.775rem] px-1">{data}</p>
               )
             })}
           </div>
          </div>
          ):(
            <div className="mx-auto mt-5 text-center align-baseline" style={{verticalAlign:'baseline'}} >
        </div>
          )
          }
      </div>

    );
  }
  else{
    return(
      <ImSpinner2 className="animate-spin my-6 fill-primary mx-auto" size={42} />
    )
  }
})


function PrintLetter() {
  const router = useRouter();
  const [username, setUserName] = useState();
  let user = router.query.user;
  let user_name;
  const userid = cookie.get("token");
  const [data, setData] = useState(false);
  useEffect(() => {
    try {
      const userObject = {
        _id: user
      }
      getUser(userid).then(async(response) => {
        
        setUserName(response.user["role"]);
        
      });
    } catch (err) {
      console.log(err)
    }
  }, [data]);

  let componentRef;
  componentRef = useRef();
  return (
    <div className='bg-gray-50 min-h-fit py-5'>
      <div className="mx-auto max-w-5xl px-4 sm:px-8 sm:py-5 text-end">
        <ReactToPrint
          trigger={() => <a className="px-6 py-3 text-blue-50 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200" href="#">Download</a>}
          content={() => componentRef}
        />
        {username === "Student" && (<>
          <Link href="/user">
            <button className='px-6 py-2 mx-4 text-blue-50 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200'>
              Back
            </button>
          </Link>
        </>)}
        {username === "Admin" && (<>
          <Link href="/admin">
            <button className='px-6 py-2 mx-4 text-blue-50 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200'>
              Back
            </button>
          </Link>
        </>)}
      </div>
      <CompanyLetter ref={el => (componentRef = el)} />
      
    </div>
  );

}
export default PrintLetter


