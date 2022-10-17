import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/router";
import cookie from 'js-cookie';
import { getUser } from '../utils/getUser'
import { useEffect } from 'react'
function internshipLetter() {
    const router = useRouter()
    let internship_id=router.query.id;
    let user;
    let user_name
    let internship_data
    const [isDataRecieved, setIsDataRecieved] = useState(false);
    const [data, setData] = useState(false);
    const [username,setUserName]=useState([]);
    const [internshipdata,setInternshipData]=useState([]);
    useEffect(() => {
      try{
        const token = cookie.get("token");
        getUser(token).then(async(response) => {
            user=response.user["id"];
            user_name= response.user 
            if(user_name)
            {
              //console.log(user_name)
              setUserName(user_name)
              setData(true)
            }       
          });
          console.log(username);
          const bodyObject={
            user: username["id"],
            _id: internship_id
          }
          console.log(bodyObject);
            fetch("/api/student/internship", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf8 ",
              },
              body: JSON.stringify(bodyObject),
            }).then(async (res) => {
              const resData=await res.json()
            internship_data=resData.data;
            if(internship_data)
            {
            setInternshipData(internship_data);
            setIsDataRecieved(true);
            }
            });

      
            //console.log(internshipdata._id);
            
      
            // if(resData.success){
            //   setIsDataRecieved(true);
            //   router.push("/")
            // }
      }catch(err){
        console.log(err);
      }
      },[isDataRecieved, data]);
  if(isDataRecieved && data){
    console.log(internshipdata);
  return (
    
    <div className='mx-auto max-w-5xl px-4 sm:px-8 my-10'>
        <div>
            <p>To,</p>
            <p>The Principle,</p>
        </div>
        <div className='my-5'>
            <p>{username["school"]},</p>
            <p>Amrita Vishwa Vidyapeetham,</p>
            <p>Amritapuri, Kollam, Kerala</p>
        </div>
        <div className='my-5'>
            <p>Subject: Regarding approval to join internship.</p>
        </div>
        <div className='my-5'>
            <p>Respected Sir/Madam,</p>
        </div>
        <div className='my-5'>
            <p className='indent-8'>I am {username["name"]} of {username["course"]} {username["branch"]} student of {username["year_of_joining"]} batch currently studying in {username["semester"]} semester.
             I applied for the Internship program in the {internshipdata["company_name"]} for {internshipdata["training_type"]} and I got selected for program.</p>
             <p className='my-3'>I request you to give me permission to join the internship which is starting on {internshipdata["internship_start_date"].substring(0,9)} and ending on {internshipdata["internship_end_date"].substring(0,9)}.</p>
        </div>
        <div className='flex flex-row justify-between mx-3 items-end'>
            <div>
                <p>Thanking You,</p>
                <p>Yours truly,</p>
                <p>{username["name"]}</p>
                <p>{username["rollno"]}</p>
                <p>Signature</p>
            </div>
            <div>
               
                <p className='mb-2'>Advisor signature</p>
            </div>
            <div>
                <p className='mb-2'>HOD signature</p>
            </div>

        </div>
      
    </div>
  

  )
  }
}
export default internshipLetter