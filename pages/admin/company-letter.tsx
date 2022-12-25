import Link from 'next/link';
import cookie from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import React, { useRef } from 'react';
import { useRouter } from "next/router";
import { getUser } from '../../utils/getUser'
import ReactToPrint from "react-to-print";
import Image from "next/image";
import Header from '../../public/img/head.png'
import Footer from '../../public/img/Footer.png'

const CompanyLetter = React.forwardRef<HTMLDivElement>(function InternshipLetter(prop, ref) {
  const [username, setUserName] = useState([]);
  const [role, setRole] = useState();
  const router = useRouter()
  let user = router.query.user;
  let internship_id = router.query.id;
  const userid = cookie.get("token");
  let user_name
  let internship_data
  const [isDataRecieved, setIsDataRecieved] = useState(false);
  const [data, setData] = useState(false);

  const [internshipdata, setInternshipData] = useState([]);

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

  if (isDataRecieved && data) {
    let member = internshipdata["member"] == null ? null : JSON.parse(internshipdata["member"]);
    return (
      <div className="mx-auto max-w-4xl text-[16px] font-sans" ref={ref} style={{width: 780.7007874, height:1050.519685}}>
        <div className="mt-0 mb-0 text-center">
          {role!="Admin" ?(<>
          <Image src={Header} />
          </>
          ):(
            <>
            <div style={{height:240}}></div> </>
          )
          }
        </div>
        <p className="my-3 text-center mr-10">
          Aum Amriteswaryai Namah
        </p>
        <div className='px-4 sm:px-8 mt-10 mb-5' >
          <div className='my-5'>
            <p>{internshipdata["company_person_name"]}</p>
            <p>{internshipdata["company_name"]}</p>
            {/* <p>Designation</p> */}
            <p>{internshipdata["company_location"]}</p>
          </div>
          <div className='my-5 font-medium'>
            <p>Subject:- Request for Internship for {username["course"]} student.</p>
          </div>
          <div className='my-5'>
            <p>Respected Sir/Madam,</p>
          </div>
          <div className='my-5 mx-2'>
            {username["school"]} is one of the several professional institutions under Amrita Vishwa
            Vidyapeetham, established under section 3 of the UGC Act, 1956. {username["course"]} students
            studying in  {username["school"] === "Amrita School Of Arts and Science" && (<>ASAS</>)} are advised to do Internship in reputed organizations. This will give them some practical
            experience which will contribute substantially to their learning process
          </div>
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
            <div className="my-5 mx-2">
              <b>1.</b> {username["name"]}
            </div>{member.map((members, i) => {
              return (<>
                <div className="my-5 mx-2">
                  <b>{i + 2}.</b> {members.name_member}
                </div>
              </>)
            })}</>)}


          <div className="my-5 mx-2">
            Internship Duration: {internshipdata["internship_start_date"].substring(0, 10)} to {internshipdata["internship_end_date"].substring(0, 10)}
          </div>
          <div className="my-5 mx-2">
            Thanking you,
          </div>
          <div className="my-1 mx-2">
            Ever in Amma&apos;s service,
          </div>
          <div className='flex flex-row justify-between mx-3 items-end my-6'>
            <div>
              <p>Br. Vishwanathamrita Chaitanya </p>
              <p>Head - Corporate & Industry Relations</p>
              <p>Amritapuri Campus</p>
            </div>
          </div>
          
        </div>
        
        <div className="mx-auto mt-5 text-center align-baseline" style={{verticalAlign:'baseline'}} >
          {/* <Image src={Footer} width={600} height={50} /> */}

        </div>
      </div>

    );
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
    <div>
      <CompanyLetter ref={el => (componentRef = el)} />
      <div className="mx-auto max-w-5xl px-4 sm:px-8 my-5">
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
    </div>
  );

}
export default PrintLetter


